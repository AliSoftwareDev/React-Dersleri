import { useState } from 'react'

// UYGULAMA MOCK VERİSİ
// Şimdilik bileşen dışında duran örnek veri dizisi (henüz App state'ine bağlanmamış)
const data = [
  { id: 1, title: "Yumurta", quantity: 10, completed: false },
  { id: 2, title: "Ekmek", quantity: 3, completed: true },
  { id: 3, title: "Zeytin", quantity: 1, completed: true },
  { id: 4, title: "Peynir", quantity: 5, completed: false },
  { id: 5, title: "Reçel", quantity: 2, completed: true },
]

// ANA UYGULAMA BİLEŞENİ (Main Component)
// Tüm alt bileşenleri bir arada tutar ve ana durumu (state) yönetir.
function App() {
  // Bütün ürünlerin tutulduğu merkezi durum (state)
  const [items, setItems] = useState([])

  // YUKARI TAŞINMIŞ STATE YÖNETİMİ (Lifting State Up)
  // Form bileşeninden gelen yeni ürün objesini mevcut listeye ekler
  function handleAddItem(item) {
    setItems((items) => [...items, item]); // Immutability korunarak yeni dizi oluşturuluyor
  }

  // ID değerine göre seçilen ürünü diziden filtreleyerek siler
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      {/* Statik başlık bileşeni */}
      <Header />
      
      {/* Veri ekleme yetkisi (onAddItem) prop olarak Form'a aktarılıyor */}
      <Form onAddItem={handleAddItem}/>
      
      {/* Liste verisi (items) ve silme fonksiyonu (onDeleteItem) List'e aktarılıyor */}
      <List items={items} onDeleteItem={handleDeleteItem}/>
      
      {/* Alt bilgi bileşeni */}
      <Summary />
    </div>
  )
}

// BAŞLIK BİLEŞENİ
// Sadece sabit başlık JSX'i döndüren basit bileşen
function Header() {
  return (
    <h1>🛒 Shopping List</h1>
  )
}

// ÜRÜN EKLEME FORMU BİLEŞENİ
// Kullanıcıdan input verilerini alır ve App bileşenine iletir
function Form({onAddItem}) {
  // Form alanları için yerel durumlar (Local States)
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Form gönderildiğinde çalışan olay işleyici (Event Handler)
  function handleFormSubmit(e) {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    // Formdaki verilerle yeni bir ürün objesi oluşturulur
    const item = {id: Date.now(), title, quantity, completed: false}
    console.log(item);

    // Oluşturulan obje üst bileşene (App) gönderilir
    onAddItem(item);

    // Form alanları sıfırlanır
    setTitle('');
    setQuantity('');
  }

  return (
    <form className='form' onSubmit={handleFormSubmit}>
      {/* Metin Girdisi: Controlled Component (değeri state'e bağlı, değişimi setTitle ile yakalanır) */}
      <input 
        type="text" 
        placeholder='Ürün Adı Giriniz...' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />
      
      {/* Adet Seçim Kutusu: Seçilen değer Number'a çevrilerek state'e yazılır */}
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {/* 1-10 arası dinamik dizi oluşturulup <option> etiketlerine dönüştürülür */}
        {Array.from({length:10}, (v,i) => i+1)
          .map(num => <option value={num} key={num}>{num}</option>)
        }
      </select>    
      
      <button type='submit'>Ekle</button>
    </form>
  )
}

// LİSTE BİLEŞENİ
// App'ten gelen ürünler dizisini ve silme fonksiyonunu karşılar
function List({items, onDeleteItem}) {
  return <>
  {
    /* KOŞULLU RENDER (Ternary Operator) */
    /* Liste doluysa <ul> yapısını, boşsa <p> uyarısını ekrana basar */
    items.length > 0 ? (
       <div className="list">
      <ul>
        {/* items dizisi dönülerek her eleman için Item bileşeni üretilir */}
        { items.map((i, index) => (<Item item={i} key={index} onDeleteItem={onDeleteItem}/>))}
      </ul>
    </div>
    ) : <p>No items</p>
  }
  </>;
}

// TEKİL LİSTE ELEMANI BİLEŞENİ
// Her bir ürünün görünümünü ve silme butonunu yönetir
function Item({item, onDeleteItem}) {
  return (
    <li>
      {/* KOŞULLU INLINE STİL */}
      {/* item.completed true ise yazının üzerini çizer, değilse stil uygulamaz */}
      <span style={item.completed ? {textDecoration: "line-through"} : {}}>
        {item.quantity}  {item.title}
      </span>
      
      {/* Silme Butonu: Tıklanınca ilgili ürünün id'sini yukarı fırlatır */}
      <button onClick={() => onDeleteItem(item.id)}>x</button>
    </li>
  )
}

// ÖZET ALT BİLGİ BİLEŞENİ
// Statik metin içeren alt bilgi bileşeni
function Summary() {
  return (
    <footer className='summary'>Alışveriş sitenizde 5 ürün bulunmaktadır.</footer>
  )
}

export default App