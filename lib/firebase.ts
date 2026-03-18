// lib/firebase.ts — Firebase data helpers (replaces Supabase)
//
// Supabase → Firebase mapping:
//   supabase.from('x').select()      → getCollection('x')
//   supabase.from('x').insert(data)  → addDocument('x', data)
//   supabase.from('x').update(data)  → updateDocument('x', id, data)
//   supabase.from('x').delete()      → deleteDocument('x', id)

import {
  getFirestore,
  collection, doc,
  getDoc, getDocs,
  addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit,
  type WhereFilterOp,
  type OrderByDirection,
  type DocumentData,
} from 'firebase/firestore';
import { app } from '../firebase';

export const db = getFirestore(app);

export async function getCollection<T = DocumentData>(name: string) {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocument<T = DocumentData>(name: string, id: string) {
  const snap = await getDoc(doc(db, name, id));
  return snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null;
}

export async function addDocument<T extends DocumentData>(name: string, data: T) {
  const ref = await addDoc(collection(db, name), data);
  return ref.id;
}

export async function updateDocument<T extends Partial<DocumentData>>(name: string, id: string, data: T) {
  await updateDoc(doc(db, name, id), data);
}

export async function deleteDocument(name: string, id: string) {
  await deleteDoc(doc(db, name, id));
}

interface QueryOptions {
  filters?: Array<{ field: string; op: WhereFilterOp; value: unknown }>;
  orderByField?: string;
  orderDirection?: OrderByDirection;
  limitTo?: number;
}

export async function queryCollection<T = DocumentData>(name: string, options: QueryOptions = {}) {
  const { filters = [], orderByField, orderDirection = 'asc', limitTo } = options;
  const constraints = [
    ...filters.map(f => where(f.field, f.op, f.value)),
    ...(orderByField ? [orderBy(orderByField, orderDirection)] : []),
    ...(limitTo      ? [limit(limitTo)]                        : []),
  ];
  const snap = await getDocs(query(collection(db, name), ...constraints));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as T) }));
}
