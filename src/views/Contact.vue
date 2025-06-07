<template>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us</title>
</head>
<body>
@include('partial.sticknavbar')
  <section class="bg-gray-100 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">Meet our team</h1>
    <p class="max-w-2xl mx-auto text-gray-600">
      Untuk menjadi perusahaan yang diinginkan pelanggan kami, kami — Bagus, Ikhsan Fauzi, Wahyu, Ian, Wahid, dan Zaidan — hadir dengan semangat kolaboratif dan visi global dalam dunia fashion digital.
    </p>
  </section>

  <section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-2xl font-bold mb-4">About</h2>
    <p class="text-gray-700 mb-6">
      Berawal dari project di salah satu mata kuliah, kami 6 mahasiswa aktif...
    </p>
    <h2 class="text-2xl font-bold mb-4">Misi Kami</h2>
    <ul class="space-y-3 text-gray-700">
      <li class="flex items-start">
        <span class="text-green-500 mr-2">✔</span>
        Menyediakan produk fashion yang stylish, berkualitas, dan terjangkau.
      </li>
      <li class="flex items-start">
        <span class="text-green-500 mr-2">✔</span>
        Menghadirkan pengalaman belanja yang mudah, aman, dan nyaman.
      </li>
      <li class="flex items-start">
        <span class="text-green-500 mr-2">✔</span>
        Mengembangkan industri fashion lokal agar dapat bersaing di pasar internasional.
      </li>
    </ul>

    <div class="mt-8 bg-gray-200 p-4 border-l-4 border-gray-700 rounded">
      📅 <strong>Launching Resmi:</strong> Website kami akan resmi diluncurkan pada <strong>14 Juni 2025</strong>.
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h1 class="text-3xl font-bold">Our Team</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        <div class="relative group">
          <img src="../images/aboutus/iC.png" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Ikhsanuddin Ahmad Fauzi</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
        <div class="relative group">
          <img src="../images/aboutus/zC.jpg" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Muhammad Zaidan Elha Rasyad</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
        <div class="relative group">
          <img src="../images/aboutus/wC.jpg" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Wahid Nurrohim</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
        <div class="relative group">
          <img src="../images/aboutus/bC.jpg" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Bagus Putra Wiratama</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
        <div class="relative group">
          <img src="../images/aboutus/wy.png" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Wahyu Adi Nugroho</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
        <div class="relative group">
          <img src="../images/aboutus/in.png" class="w-full rounded-lg transform group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 rounded-lg">
            <h3 class="text-xl font-semibold">Puantorian Antasena Handoko</h3>
            <p class="text-sm">Peran frontEnd</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  @include('partial.footer')
</body>
</template>

<script>
export default {
    name: "Contact",
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: ""
            },
            submitted: false
        };
    },
    methods: {
        submitForm() {
            this.submitted = true;
            this.form = { name: "", email: "", message: "" };
            setTimeout(() => {
                this.submitted = false;
            }, 3000);
        }
    }
};
</script>

<style scoped>
.contact-page {
    max-width: 500px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    box-sizing: border-box;
    width: 100%;
}
.contact-form .form-group {
    margin-bottom: 16px;
}
.contact-form label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
}
.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}
.contact-form button {
    padding: 10px 24px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    display: block;
}
.contact-form button:hover {
    background: #0056b3;
}
.success-message {
    margin-top: 20px;
    color: #28a745;
    font-weight: bold;
    text-align: center;
}

/* Responsive styles */
@media (max-width: 600px) {
    .contact-page {
        padding: 12px;
        margin: 16px;
        max-width: 100%;
    }
    .contact-form input,
    .contact-form textarea {
        font-size: 0.95rem;
        padding: 7px;
    }
    h1 {
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-form button {
        font-size: 1rem;
        padding: 10px;
        width: 100%;
        max-width: none;
    }
}
</style>