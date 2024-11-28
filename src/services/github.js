const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER;

const btoa = str => window.btoa(unescape(encodeURIComponent(str)));
const atob = str => decodeURIComponent(escape(window.atob(str)));

export const GitHubService = {
  async saveRegistration(data) {
    try {
      const currentData = await this.getRegistrations();
      
      // Generate ID dengan format REG-2024-001
      const currentCount = currentData.registrations.length + 1;
      const registrationId = `REG-2024-${String(currentCount).padStart(3, '0')}`;
      
      const newRegistration = {
        ...data,
        id: registrationId,
        registrationDate: new Date().toISOString(),
        status: 'REGISTERED',
        verificationStatus: 'PENDING'
      };
      
      currentData.registrations.push(newRegistration);
      currentData.metadata = {
        totalQuota: 45,
        registeredCount: currentData.registrations.length,
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/registrations.json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Pendaftaran baru: ${data.child.name}`,
            content: btoa(JSON.stringify(currentData, null, 2)),
            sha: await this.getFileSHA()
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gagal menyimpan data: ${errorData.message}`);
      }

      return currentData;
    } catch (error) {
      console.error('GitHub Save Error:', error);
      throw error;
    }
  },

  async getRegistrations() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/registrations.json`
      );
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari GitHub');
      }

      const data = await response.json();
      return JSON.parse(atob(data.content));
    } catch (error) {
      console.error('GitHub Get Error:', error);
      return {
        registrations: [],
        metadata: {
          totalQuota: 45,
          registeredCount: 0,
          lastUpdated: new Date().toISOString()
        }
      };
    }
  },

  async checkQuota() {
    try {
      const data = await this.getRegistrations();
      return {
        total: data.metadata.totalQuota,
        registered: data.metadata.registeredCount,
        available: data.metadata.totalQuota - data.metadata.registeredCount
      };
    } catch (error) {
      console.error('Quota Check Error:', error);
      throw new Error('Gagal mengecek kuota');
    }
  },

  async getFileSHA() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/registrations.json`
      );
      const data = await response.json();
      return data.sha;
    } catch (error) {
      console.error('GitHub SHA Error:', error);
      throw new Error('Gagal mendapatkan SHA file');
    }
  }
}; 