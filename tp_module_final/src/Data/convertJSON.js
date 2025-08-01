import { forEach } from './Products.json';  //ruta y nombre del JSON a convertir
import { writeFileSync } from 'fs';
const obj = { products: {} };
forEach(p => { p.products[p.id] = p; });
writeFileSync('Products_firestore.json', JSON.stringify(obj, null, 2));     //nombre del JSON de salida

//Ejecutar con    node convertProducts.js
