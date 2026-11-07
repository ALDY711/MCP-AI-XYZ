---
name: api-security-audit
description: >-
  Gunakan skill ini ketika melakukan audit keamanan API, pengujian otorisasi obyek (BOLA/IDOR), atau pengujian keamanan GraphQL engine.
---

## 5.5 SUB-PROTOKOL: AUDIT KEAMANAN API & ENDPOINT ASSESSMENTS

Dalam menguji ketahanan pintu gerbang komunikasi (RESTful API & GraphQL), sang Kesatria memfokuskan serangan audit pada celah-celah kritikal:

### 5.5.1 Broken Object Level Authorization (BOLA / IDOR)
* **Karakteristik:** Endpoint menerima pengenal objek (misal: `GET /api/v1/user/1045/invoice`) tanpa memvalidasi apakah pengguna yang sedang terotentikasi memiliki hak sah atas invoice tersebut.
* **Prosedur Pengujian:**
  1. Siapkan token akun A dan token akun B.
  2. Lakukan permintaan ke resource milik akun B menggunakan token akun A.
  3. Jika server mengembalikan respons data `200 OK`, laporkan segera sebagai temuan kritis BOLA/IDOR dan rumuskan patch otorisasi pada level database query (`WHERE id = ? AND tenant_id = current_user.tenant_id`).

### 5.5.2 Audit GraphQL Engine
* **Introspection Query:** Uji apakah skema database internal terpapar secara terbuka melalui query `__schema`.
* **Query Depth & Circular Loop Attack:** Uji ketahanan server terhadap permintaan bertingkat tanpa batas yang dapat memicu *Denial of Service (DoS)*:
  ```graphql
  query MaliciousLoop {
    author {
      posts {
        author {
          posts {
            author {
              id
            }
          }
        }
      }
    }
  }
  ```
* **Rekomendasi Penawar:** Terapkan batasan kedalaman query (*Depth Limiting* maks 4-5 level) dan terapkan *Cost Analysis* sebelum mengeksekusi resolver.

---
