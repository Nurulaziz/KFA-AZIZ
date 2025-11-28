import { describe, it, expect, beforeAll } from 'vitest'
import api from '../../services/api'

// describe('API Integration Test', () => {
//     beforeAll(() => {
//     // ganti dg token yg valid
//     localStorage.setItem(
//         'token',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5Aa2ZhLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDIxMjUzNywiZXhwIjoxNzY0ODE3MzM3fQ.4S2IRD7F-gryUHqZ_W8RaWMRs0X3__MlY-_n6cFQp4Q'
//     );
// });
//     it('should fetch users seccesfully', async () => {
//         const response = await api.get('/users');
//         expect (response.status).toBe(200);
//     })
// })

// API Base URL - langsung ke server
const API_BASE_URL = 'http://145.79.15.116:3000/api';

// Buat instance axios untuk testing
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Data test user - gunakan random email agar tidak duplikat
const randomId = Date.now();
const testUser = {
  username: `testuser_${randomId}`,
  fullName: 'Test User Integration',
  email: `testuser_${randomId}@test.com`,
  password: 'Test123456',
  role: 'user',
};

// Simpan token untuk test selanjutnya
let authToken = null;
let createdUserId = null;

describe('Auth API Integration Tests', () => {
  // ==========================================
  // TEST 1: Register - Mendaftarkan user baru
  // ==========================================
    describe('POST /auth/register', () => {
        it('harus berhasil mendaftarkan user baru', async () => {
        try {
        const response = await api.post('/auth/register', testUser);

        console.log('Register Response:', response.data);

        // API mengembalikan 201 Created untuk register
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('success', true);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('token');
        expect(response.data.data).toHaveProperty('user');
        expect(response.data.data.user).toHaveProperty('email', testUser.email);

        // Simpan token untuk test selanjutnya
        authToken = response.data.data.token;
        createdUserId = response.data.data.user.id;
        } catch (error) {
            // Jika error karena email sudah ada, skip test ini
            if (error.response?.data?.message?.includes('already')) {
            console.log('User sudah ada, skip register test');
            return;
            }
            throw error;
        }
        });

        it('harus gagal jika email sudah terdaftar', async () => {
        try {
            await api.post('/auth/register', testUser);
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toHaveProperty('success', false);
        }
        });

        it('harus gagal jika data tidak lengkap', async () => {
        try {
            await api.post('/auth/register', {
            email: 'incomplete@test.com',
            // password tidak ada
            });
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
        });
    });

    // ==========================================
    // TEST 2: Login - Masuk dengan kredensial
    // ==========================================
    describe('POST /auth/login', () => {
        it('harus berhasil login dengan kredensial yang benar', async () => {
        const response = await api.post('/auth/login', {
            email: testUser.email,
            password: testUser.password,
        });

        console.log('Login Response:', response.data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('token');
        expect(response.data.data).toHaveProperty('user');

        // Update token
        authToken = response.data.data.token;
        });

        it('harus gagal login dengan password salah', async () => {
        try {
            await api.post('/auth/login', {
            email: testUser.email,
            password: 'wrongpassword',
            });
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty('success', false);
        }
        });

        it('harus gagal login dengan email yang tidak terdaftar', async () => {
        try {
            await api.post('/auth/login', {
            email: 'notexist@test.com',
            password: 'anypassword',
            });
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
        });

        it('harus gagal login tanpa email', async () => {
        try {
            await api.post('/auth/login', {
            password: 'somepassword',
            });
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
        });
    });

    // ==========================================
    // TEST 3: Get Current User - Ambil data user
    // ==========================================
    describe('GET /auth/me', () => {
        it('harus berhasil mendapatkan data user dengan token valid', async () => {
        if (!authToken) {
            console.log('No token available, skipping test');
            return;
        }

        const response = await api.get('/auth/me', {
            headers: {
            Authorization: `Bearer ${authToken}`,
            },
        });

        console.log('Get Me Response:', response.data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('user');
        expect(response.data.data.user).toHaveProperty('email', testUser.email);
        });

        it('harus gagal tanpa token', async () => {
        try {
            await api.get('/auth/me');
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
        });

        it('harus gagal dengan token invalid', async () => {
        try {
            await api.get('/auth/me', {
            headers: {
                Authorization: 'Bearer invalid_token_here',
            },
            });
            expect(true).toBe(false); // Force fail
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
        });
    });

    // ==========================================
    // TEST 4: Logout
    // ==========================================
    describe('POST /auth/logout', () => {
        it('harus berhasil logout dengan token valid', async () => {
        if (!authToken) {
            console.log('No token available, skipping test');
            return;
        }

        const response = await api.post(
            '/auth/logout',
            {},
            {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            }
        );

        console.log('Logout Response:', response.data);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('success', true);
        });
    });
    });

    // ==========================================
    // TEST TERPISAH: Login dengan User Admin
    // ==========================================
    describe('Admin Login Integration Test', () => {
    it('harus berhasil login sebagai admin (jika ada)', async () => {
        try {
        const response = await api.post('/auth/login', {
            email: 'admin@admin.com',
            password: 'admin123',
        });

        console.log('Admin Login Response:', response.data);

        expect(response.status).toBe(200);
        expect(response.data.data.user).toHaveProperty('role', 'admin');
        } catch (error) {
        console.log('Admin user tidak ditemukan atau password berbeda');
        }
    });
    });