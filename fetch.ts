import dotenv from 'dotenv';
dotenv.config();

const url = 'http://localhost:3000/api/store/siteContent';

async function updateDb() {
  try {
    const res = await fetch(url);
    const result = await res.json();
    let data = result.data;
    if (data && data.product) {
      data.product.whatsapp = "628883748626";
      console.log("Updating whatsapp to 628883748626");
      const postRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      console.log("Post result:", await postRes.json());
    } else {
      console.log("Data structure not found.", data);
    }
  } catch (error) {
    console.error(error);
  }
}

updateDb();
