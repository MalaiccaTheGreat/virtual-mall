const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Secure HTTP endpoint for role assignment
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // 1. Verify the requester is an admin
  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied', 
      'Only admins can assign roles'
    );
  }

  // 2. Set custom claims (attached to the user's auth token)
  await admin.auth().setCustomUserClaims(data.uid, {
    admin: data.role === 'admin',    // Example: { role: 'admin' }
    manager: data.role === 'manager'
  });

  // 3. Update Firestore for easy querying
  await admin.firestore().collection('users').doc(data.uid).update({
    role: data.role,
    lastUpdated: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true, message: `Role "${data.role}" assigned to user ${data.uid}` };
});