const StatusMap: Map<number, string> = new Map([
  [0, 'Menunggu Konfirmasi'],
  [1, 'Menunggu Pembayaran'],
  [2, 'Berhasil'],
  [3, 'Selesai'],
  [4, 'Gagal'],
  [5, 'Selesai'],
]);

export const days = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export default StatusMap;
