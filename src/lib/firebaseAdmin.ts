// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Шлях до сервісного облікового запису
const serviceAccountPath = process.env.FIREBASE_ADMIN_CREDENTIALS;

// Перевірка, чи шлях існує
if (!serviceAccountPath) {
  throw new Error('The FIREBASE_ADMIN_CREDENTIALS environment variable is not set.');
}

// Потрібно використовувати 'fs' для читання файлу на сервері
import fs from 'fs';

// Переконайтеся, що файл існує, інакше Node.js викине помилку
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };