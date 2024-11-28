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
  },

  async deleteRegistration(id, password) {
    try {
      if (password !== "123") {
        throw new Error("Password salah!");
      }

      const currentData = await this.getRegistrations();
      const index = currentData.registrations.findIndex(reg => reg.id === id);
      
      if (index === -1) {
        throw new Error("Data tidak ditemukan");
      }

      // Hapus data
      currentData.registrations.splice(index, 1);
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
            message: `Hapus pendaftaran: ${id}`,
            content: btoa(JSON.stringify(currentData, null, 2)),
            sha: await this.getFileSHA()
          })
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      return currentData;
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  },

  async commitFiles(files) {
    try {
      // Dapatkan base tree dari branch utama
      const masterRef = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/main`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
          }
        }
      ).then(res => res.json());

      // Buat blob untuk setiap file
      const blobs = await Promise.all(
        files.map(async file => {
          const blobData = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/blobs`,
            {
              method: 'POST',
              headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: btoa(file.content),
                encoding: 'base64'
              })
            }
          ).then(res => res.json());

          return {
            path: file.path,
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
          };
        })
      );

      // Buat tree baru
      const tree = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            base_tree: masterRef.object.sha,
            tree: blobs
          })
        }
      ).then(res => res.json());

      // Buat commit
      const commit = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/commits`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Tambah fitur export data',
            tree: tree.sha,
            parents: [masterRef.object.sha]
          })
        }
      ).then(res => res.json());

      // Update referensi branch
      await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/main`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sha: commit.sha,
            force: true
          })
        }
      );

      return true;
    } catch (error) {
      console.error('GitHub Commit Error:', error);
      throw new Error('Gagal mengirim update ke repository');
    }
  }
}; 