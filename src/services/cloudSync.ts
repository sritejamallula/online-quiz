import { StudentProfile, QuizAttempt } from '../types';

// Dedicated cloud synchronization object ID for B.Tech Quiz System
const CLOUD_OBJECT_ID = 'ff808181a09d98f701a15976d9952db0';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

export interface CloudPayload {
  registeredStudents: StudentProfile[];
  quizAttempts: QuizAttempt[];
  lastSyncedAt: string;
}

// Broadcast channel for multi-tab synchronization on the same device
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('btech_quiz_realtime_sync');
  }
} catch {
  broadcastChannel = null;
}

/**
 * Fetch the latest real-time registered students and quiz attempts from cloud.
 */
export async function fetchFromCloud(): Promise<CloudPayload | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(CLOUD_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data && data.data && typeof data.data.payload === 'string') {
      const parsed: CloudPayload = JSON.parse(data.data.payload);
      return {
        registeredStudents: Array.isArray(parsed.registeredStudents) ? parsed.registeredStudents : [],
        quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
        lastSyncedAt: parsed.lastSyncedAt || new Date().toISOString(),
      };
    }

    return null;
  } catch (err) {
    console.warn('Realtime cloud fetch notice:', err);
    return null;
  }
}

/**
 * Push merged real-time data to cloud so all devices see the update.
 */
export async function pushToCloud(
  registeredStudents: StudentProfile[],
  quizAttempts: QuizAttempt[]
): Promise<boolean> {
  try {
    const payload: CloudPayload = {
      registeredStudents,
      quizAttempts,
      lastSyncedAt: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(CLOUD_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'btech_online_quiz_registry_sritejamallula',
        data: {
          payload: JSON.stringify(payload),
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      // Notify other tabs on the same device
      broadcastChannel?.postMessage({ type: 'SYNC_UPDATE', timestamp: Date.now() });
      return true;
    }

    return false;
  } catch (err) {
    console.warn('Realtime cloud push notice:', err);
    return false;
  }
}

/**
 * Merge local and cloud students (de-duplicate by roll number).
 * Strictly keeps real registered students, no mock users.
 */
export function mergeStudents(
  local: StudentProfile[],
  cloud: StudentProfile[]
): StudentProfile[] {
  const map = new Map<string, StudentProfile>();

  // Add cloud first
  cloud.forEach((s) => {
    if (s && s.rollNumber) {
      const key = s.rollNumber.trim().toUpperCase();
      map.set(key, { ...s, rollNumber: key });
    }
  });

  // Merge local
  local.forEach((s) => {
    if (s && s.rollNumber) {
      const key = s.rollNumber.trim().toUpperCase();
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...s, rollNumber: key });
      } else {
        // Prefer the one with more recent registeredAt or more info
        map.set(key, {
          ...existing,
          ...s,
          rollNumber: key,
          registeredAt: existing.registeredAt || s.registeredAt || new Date().toISOString(),
        });
      }
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.registeredAt ? new Date(a.registeredAt).getTime() : 0;
    const timeB = b.registeredAt ? new Date(b.registeredAt).getTime() : 0;
    return timeB - timeA;
  });
}

/**
 * Merge local and cloud quiz attempts (de-duplicate by attempt id).
 */
export function mergeAttempts(
  local: QuizAttempt[],
  cloud: QuizAttempt[]
): QuizAttempt[] {
  const map = new Map<string, QuizAttempt>();

  cloud.forEach((a) => {
    if (a && a.id) {
      map.set(a.id, a);
    }
  });

  local.forEach((a) => {
    if (a && a.id) {
      map.set(a.id, a);
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
    const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
    return timeB - timeA;
  });
}

/**
 * Subscribe to cross-tab updates.
 */
export function onCrossTabSync(callback: () => void): () => void {
  if (!broadcastChannel) return () => {};

  const handler = (event: MessageEvent) => {
    if (event.data?.type === 'SYNC_UPDATE') {
      callback();
    }
  };

  broadcastChannel.addEventListener('message', handler);
  return () => {
    broadcastChannel?.removeEventListener('message', handler);
  };
}
