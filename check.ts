import dotenv from 'dotenv';
dotenv.config();

const url = 'http://localhost:3000/api/store/siteContent';

async function checkDb() {
  try {
    const res = await fetch(url);
    const result = await res.json();
    console.log("DB says:", result.data.product.whatsapp);
  } catch (error) {
    console.error(error);
  }
}

checkDb();
