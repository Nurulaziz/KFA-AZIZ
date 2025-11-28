import {describe, it, expect} from 'vitest';

describe('Fungsi Tambah', () => {
    let a = 2;
    let b = 3;

    function tambah(x,y){
        return x + y;
    }

    it('menambahkan dua angka dengan benar', () => {
        // act
        let hasil = tambah (a,b);

        //asert
        expect(hasil).toBe(5);
    });
});