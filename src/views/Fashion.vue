<template>
  <div class="fashion-page">
    <header class="fashion-header">
      <h1>Fashion Collection</h1>
      <p>Temukan koleksi fashion terbaru di Lucien Avenue!</p>
    </header>
    <section class="fashion-list">
      <div
        v-for="item in fashionItems"
        :key="item.id"
        class="fashion-card"
      >
        <img :src="item.image" :alt="item.name" class="fashion-image" />
        <h2 class="fashion-name">{{ item.name }}</h2>
        <p class="fashion-price">Rp {{ item.price.toLocaleString() }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Fashion",
  data() {
    return {
      fashionItems: [
        {
          id: 1,
          name: "Kemeja Linen Pria",
          price: 249000,
          image: "https://source.unsplash.com/300x400/?shirt,men"
        },
        {
          id: 2,
          name: "Dress Floral Wanita",
          price: 329000,
          image: "https://source.unsplash.com/300x400/?dress,women"
        },
        {
          id: 3,
          name: "Celana Jeans Slim Fit",
          price: 199000,
          image: "https://source.unsplash.com/300x400/?jeans"
        },
        {
          id: 4,
          name: "Jaket Denim",
          price: 279000,
          image: "https://source.unsplash.com/300x400/?jacket"
        }
      ]
    };
  }
};
</script>

<style scoped>
.fashion-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 16px;
}
.fashion-header {
  text-align: center;
  margin-bottom: 32px;
}
.fashion-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.fashion-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 16px;
  width: 220px;
  text-align: center;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fashion-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
}
.fashion-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
.fashion-name {
  font-size: 1.1rem;
  margin: 8px 0 4px;
}
.fashion-price {
  color: #2e7d32;
  font-weight: bold;
  font-size: 1rem;
}

/* Responsive Styles */
@media (max-width: 900px) {
  .fashion-list {
    gap: 16px;
  }
  .fashion-card {
    width: 45%;
    min-width: 180px;
    max-width: 300px;
  }
  .fashion-image {
    height: 200px;
  }
}

@media (max-width: 600px) {
  .fashion-page {
    padding: 16px 4px;
  }
  .fashion-list {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .fashion-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    padding: 12px;
  }
  .fashion-image {
    height: 160px;
  }
}
</style>