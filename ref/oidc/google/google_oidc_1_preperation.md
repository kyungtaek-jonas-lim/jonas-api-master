
To obtain a **Client ID** and **Client Secret** for Google OIDC (OpenID Connect), follow these steps:

### **1. Log in to the Google Cloud Console**
- Visit [Google Cloud Console](https://console.cloud.google.com/).
- Sign in with your Google account.

---

### **2. Create a New Project or Select an Existing One**
- **Select an existing project** if you already have one.
- **Create a new project**:
  1. Click **Select a Project** at the top of the page.
  2. Click **New Project**.
    - ![New Project](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/1_preperation/google_oidc_preperation_1_create_project.png)
  3. Enter a project name and click **Create**.

---

### **3. Configure the OAuth Consent Screen**
Before you can create OAuth credentials, you need to configure the OAuth consent screen:
1. Navigate to **APIs & Services** > **OAuth consent screen**.
2. Choose the application type:
   - **External**: Accessible to any Google account users.
   - **Internal**: Restricted to Google Workspace users in your organization.
3. Fill in the required fields:
   - App name
   - User support email
   - App logo (optional)
   - Developer contact email
4. Click **Save and Continue**.
5. Add any required scopes (optional) and save the changes.
  - ![OAuth2.0 Consent #1](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/1_preperation/google_oidc_preperation_2_create_oauth2.0_consent.png)

---

### **4. Create OAuth 2.0 Credentials**
1. Go to **APIs & Services** > **Credentials**.
2. Click **+ Create Credentials** and select **OAuth 2.0 Client ID**.
3. Choose the application type:
   - **Web application**: For web apps.
   - **Desktop app**, **Android**, or **iOS** for other platforms.
4. Enter the following details:
   - **Name**: A name for the credential (e.g., "My App Client ID").
   - **Authorized redirect URIs**:
     - Add the URI where Google will redirect users after authentication. Examples:
       - For production: `https://yourdomain.com/callback`
       - For local development: `http://localhost:3000/callback`
   - **Authorized JavaScript origins** (App Domain):
     - Add domains that are allowed to access the Google APIs. Example:
       - `https://yourdomain.com`
       - `http://localhost:3000` (for development).
     - This prevents unauthorized domains from using your credentials.
5. Click **Create**.
  - ![Google Cloud Create Client #1](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/1_preperation/google_oidc_preperation_3_create_client.png)
  - ![Google Cloud Create Client #2](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/1_preperation/google_oidc_preperation_4_client_created.png)

---

### **5. Obtain the Client ID and Client Secret**
- Once created, you’ll see your **Client ID** and **Client Secret**.
- Save these securely (e.g., in a `.env` file).
  - ![Google Cloud Client Usage](https://raw.githubusercontent.com/kyungtaek-jonas-lim/jonas-api-master/main/ref/oidc/google/media/1_preperation/google_oidc_preperation_5_usage_example.png)
- You can download the credentials as a JSON file for later use.

---

### **6. Use the Client ID and Secret in Your Application**
The **Client ID** and **Client Secret** are used to authenticate with Google’s OAuth 2.0 endpoints and obtain user information. They are essential for requesting tokens and handling authentication.

---

### **Notes About the App Domain**
- The **App Domain** (under "Authorized JavaScript origins") ensures that requests to Google APIs originate only from specified domains. 
- This adds an extra layer of security, preventing unauthorized use of your credentials from other domains.
- For production, always use your verified domain (e.g., `https://yourdomain.com`). For development, you can use localhost or a staging domain.

---

### **Security Best Practices**
- Keep the **Client Secret** private and avoid committing it to version control (e.g., GitHub).
- Regularly review your OAuth credentials and restrict access by setting **Application Restrictions** and **API Restrictions**.