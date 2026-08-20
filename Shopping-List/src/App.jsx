import { useState } from 'react'

const items = [
  { id: 1, title: "Yumurta", quantity: 10, completed: false },
  { id: 1, title: "Ekmek", quantity: 3, completed: true },
  { id: 1, title: "Zeytin", quantity: 1, completed: true },
  { id: 1, title: "Peynir", quantity: 5, completed: false },
  { id: 1, title: "Reçel", quantity: 2, completed: true },
]

// Ana Uygulama Bileşeni (Main Component)
// Tüm alt bileşenleri (Header, Form, List, Summary) hiyerarşik olarak bir arada tutar.
function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <List />
      <Summary />
    </div>
  )
}

// Başlık Bileşeni
function Header() {
  return (
    <h1>🛒 Shopping List</h1>
  )
}

// Ürün Ekleme Formu Bileşeni
function Form() {
  return (
    <form className='form'>
      {/* Kullanıcıdan ürün adını alan metin girdisi */}
      <input type="text" placeholder='Ürün Adı Giriniz...' />
      
      {/* Adet Seçim Kutusu */}
      <select>
        {/* Array.from({length: 10}, (v, i) => i + 1) -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] dizisini üretir */}
        {/* map ile her bir sayı <option> etiketine dönüştürülüyor */}
        
        {Array.from({length:10}, (v,i) => i+1)
          .map(num => <option value={num}>{num}</option>)
        }
      </select>
      
      <button type='submit'>Ekle</button>
    </form>
  )
}

// Liste Bileşeni
function List() {
  return (
    <div className="list">
      <ul>
        {/* items dizisi döngüye sokuluyor */}
        {/* 'i' değişkeni sıradaki ürün nesnesini temsil eder ve Item bileşenine 'item' prop'u olarak aktarılır */}
        
        {/* Eleman ekleme/silme durumlarında DOM hatalarını önlemek için key={i.id} kullanılmalıdır. */}
        { items.map((i, index) => (<Item item={i} key={index} />))}
      </ul>
    </div>
  )
}

// Tekil Liste Elemanı Bileşeni (Child Component)
// Prop Destructuring yapılarak gelen nesne içinden 'item' alınıyor ({item})
function Item({item}) {
  return (
    <li>
      {/* Koşullu Inline Stil (Ternary Operator): */}
      {/* item.completed === true ise {textDecoration: "line-through"}, false ise {} boş obje uygular */}
      
      {/* Çözüm: {item.quantity} {item.title} veya `{item.quantity} - {item.title}` yazılabilir. */}
      <span style={item.completed ? {textDecoration: "line-through"} : {}}>{item.quantity}  {item.title}</span>
      
      {/* Silme butonu */}
      <button>x</button>
    </li>
  )
}

// Özet Alt Bilgi Bileşeni
function Summary() {
  return (
    <footer className='summary'>Alışveriş sitenizde 5 ürün bulunmaktadır.</footer>
  )
}

export default App