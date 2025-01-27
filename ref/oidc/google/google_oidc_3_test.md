### **How to Test**

#### **1. Test with Incorrect Access URI**
- [Wrong Access URI](http://localhost:3000/v1/auth/oidc/google)
  ![Wrong Access URI](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/3_test/google_oidc_test_1_wrong_access.png)

#### **2. Test with Correct Access URI**
- [OIDC Access URI](http://localhost:3000/v1/auth/oidc/google?scope=openid%20email%20profile)
  ![OIDC Access URI](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/3_test/google_oidc_test_2_oidc_access.png)
  ![Sign in with OIDC](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/3_test/google_oidc_test_3_sign_in_with_oidc.png)
  ![OIDC Success Data](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/3_test/google_oidc_test_4_oidc_success_data.png)

---

### 1. **Is it okay to make OIDC authentication response data public?**

The JSON data you shared contains user-specific information, such as:

- `sub` (unique identifier for the user)
- `name`, `given_name`, `family_name`
- `picture` (profile picture URL)
- `email` and `email_verified`

#### **Issues with making this data public:**
- **Privacy Concerns**: Even though this data might seem harmless, it contains **personally identifiable information (PII)**, such as email, name, and profile picture. Sharing it publicly could violate privacy policies, including GDPR or other regulations.
- **Security Risk**: The `sub` value is a unique identifier for the user in Google's system. While it isn't directly harmful, exposing it could potentially help malicious actors correlate user data across systems.
- **Best Practice**: Avoid exposing user-related data publicly unless it is **explicitly consented to by the user** and there is no sensitive information.

If you need to share sample OIDC data publicly (e.g., for documentation purposes), you should **anonymize** it:
```json
{
  "message": "Authentication successful",
  "user": {
    "sub": "example-sub-id",
    "name": "John Doe",
    "given_name": "John",
    "family_name": "Doe",
    "picture": "https://example.com/profile.jpg",
    "email": "example@example.com",
    "email_verified": true
  }
}
```

---

### 2. **Is it okay for OIDC query strings to expose client_id and other information?**

When initiating an OIDC flow, the **client_id** and other parameters (like redirect_uri and response_type) are typically included in the query string. For example:
```
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourdomain.com/callback
  &response_type=code
  &scope=openid%20email%20profile
  &state=xyz123
```

#### **Why this is safe:**
- **Client ID is Public by Design**: The `client_id` is **not a secret**. It is intentionally designed to be publicly visible because it identifies your application, not authenticates it.
- **Sensitive Data is Not Included**: The `client_secret`, tokens, or any other sensitive information is not included in the query string during this step.
- **Standard Practice**: Most OIDC-compliant systems (e.g., Google, GitHub, Okta) use this flow, and exposing the `client_id` in the query string is a part of the protocol.

#### **What to Watch Out For:**
1. **Use HTTPS**:
   - Ensure all communication between your app and Google's OIDC server is secured via HTTPS. This prevents the query string from being intercepted.
2. **Validate Redirect URI**:
   - Only use authorized and verified redirect URIs (configured in the Google Cloud Console). This prevents malicious actors from redirecting the flow to their domains.
3. **State Parameter**:
   - Always include a `state` parameter to prevent **CSRF (Cross-Site Request Forgery)** attacks.

---

### **Do all OIDC-integrated web services expose query strings?**
Yes, **most OIDC-based web services** expose `client_id` and other necessary parameters as part of the query string during the initial redirection to the identity provider (e.g., Google). This is by design and aligns with OIDC specifications.

---

### **Conclusion:**
1. **Don't make OIDC authentication response data public** unless it is anonymized and contains no sensitive information.
2. **Query strings with `client_id` and related information are safe to expose** if you follow proper security measures (HTTPS, state validation, authorized redirect URIs). This is standard practice for OIDC integrations.