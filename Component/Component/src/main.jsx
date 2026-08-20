import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* ============================================================================
   BOOTSTRAP ENTEGRASYONU:
   - Bootstrap'in derlenmiş CSS dosyası projeye import edilerek tüm
     layout, grid ve component class'ları (container, card, row vs.) kullanılabilir hale getirildi.
   ============================================================================ */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

/* ============================================================================
   PARENT (ATA) BİLEŞEN: App
   - Kök bileşendir. Sayfanın ana iskeletini oluşturur.
   - Header, ProductList ve Footer bileşenlerinin PARENT'ıdır.
   ============================================================================ */
function App() {
  return  (
    <>
      {/* CHILD BİLEŞEN 1: App'in alt bileşeni */}
      <Header />

      {/* 
        BOOTSTRAP LAYOUT:
        'container' sınıfı, sayfa içeriğini ekran genişliğine göre ortalar 
        ve sağdan/soldan otomatik duyarlı (responsive) kenar boşlukları (padding) ekler.
      */}
      <div className='container'>
        {/* CHILD BİLEŞEN 2 & 3: App'in alt bileşenleri */}
        <ProductList />
        <Footer />
      </div>
    </>
  )
}

/* ============================================================================
   CHILD BİLEŞEN: Header
   - App bileşeninden çağrılır.
   - Dışarıdan prop almaz, statik bir navigasyon çubuğu çizer.
   ============================================================================ */
function Header() {
  return (
    <header>
      {/* 
        BOOTSTRAP NAVBAR COMPONENT:
        - navbar: Temel navigasyon çubuğu stilini verir.
        - navbar-expand: Navigasyon ögelerinin geniş ekranlarda açık kalmasını sağlar.
        - bg-dark: Arka planı koyu renk yapabilir.
        - border-bottom & border-body: Alt kısma ince bir çizgi ekler.
        - data-bs-theme="dark": Bootstrap'in karanlık tema modunu aktif eder.
      */}
      <nav className='navbar navbar-expand bg-dark border-bottom border-body' data-bs-theme="dark">
        <div className='container'>
          {/* navbar-brand: Marka / Logo metni stilini uygular */}
          <a href='#' className='navbar-brand'>App Store</a>
        </div>
      </nav>
    </header>
  )
}

/* ============================================================================
   PARENT & CHILD BİLEŞEN: ProductList
   - App bileşeninin CHILD'ıdır.
   - İçindeki Product bileşenlerinin ise PARENT'ıdır (Ata bileşenidir).
   ============================================================================ */
function ProductList() {
  // VERİ KAYNAĞI: Obje dizisi (Array of Objects)
  const items = [
    {
      "image" : '01.webp',
      "title" : "İphone15",
      "description" : "Lorem ipsum dolor sit amet.",
      "price" : 60000,
      "is_active" : true
    },
    {
      "image" : '02.webp',
      "title" : "İphone16",
      "description" : "Lorem ipsum dolor sit amet.",
      "price" : 70000,
      "is_active" : true
    },
    {
      "image" : '03.webp',
      "title" : "İphone17",
      "description" : "Lorem ipsum dolor sit amet.",
      "price" : 80000,
      "is_active" : true
    },
    {
      "image" : '04.webp',
      "title" : "İphone18",
      "description" : "Lorem ipsum dolor sit amet.",
      "price" : 90000,
      "is_active" : true
    }
  ] 

  return (
    <>
      <h2>Product List</h2>

      {/* 
        KOŞULLU DURUM 1 (TERNARY OPERATOR):
        Koşul: items.length > 0
        - EĞER dizide en az 1 eleman varsa ➔ Ürünleri .map() ile ekrana bas.
        - DEĞİLSE (Dizi boşsa) ➔ "Şu anda ürünümüz yoktur." paragrafını çiz.
      */}
      {
        items.length > 0 ? (
          /* 
            BOOTSTRAP GRID SYSTEM (ROW COLS):
            - row: Izgara sisteminin satırını başlatır.
            - row-cols-2: Mobil ekranlarda satırda 2 kolon gösterir.
            - row-cols-md-3: Orta boy ekranlarda (Tablet) satırda 3 kolon gösterir.
            - row-cols-lg-4: Geniş ekranlarda (Masaüstü) satırda 4 kolon gösterir.
            - g-4: Kolonlar arasına dikey ve yatay boşluk (gap) koyar.
          */
          <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4' id='productList'>
            
            {/* 
              LİSTELEME (.map() Metodu):
              Dizideki her bir objeyi gezer ve her eleman için 
              bir <Product /> bileşeni döndürür.
              - productObj = { item }  ➔ Tüm obje Child'a prop olarak aktarılıyor.
              - key = { index }         ➔ React'in liste performansını takip etmesi için benzersiz anahtar.
            */}
            {
              items.map((item, index) => (
                /* BOOTSTRAP COL: Her bir ürünü ızgara sisteminin bir hücresine sarar */
                <div className='col' key={index}>
                  <Product productObj={item} />
                </div>
              ))
            }
          </div>
        ) : (
          <p>Şu anda ürünümüz yoktur.</p>
        )
      }
    </>
  )
}

/* ============================================================================
   CHILD BİLEŞEN: Product
   - ProductList bileşeninin CHILD'ıdır.
   - Kendisi veri üretmez, PARENT'tan gelen 'props' objesini alır ve ekrana çizer.
   - Destructuring ({ productObj }) kullanılarak prop doğrudan yakalanmıştır.
   ============================================================================ */
function Product({ productObj }) {
  
  /* 
    KOŞULLU DURUM 2 (EARLY RETURN - ERKEN DÖNÜŞ):
    Koşul: !productObj.is_active
    - EĞER ürün aktif değilse (is_active === false), bu bileşen daha aşağıya 
      geçmeden "null" döndürür ve React ekrana HİÇBİR ŞEY çizmez.
  */
  if (!productObj.is_active) return null;

  return (
    /* 
      BOOTSTRAP CARD COMPONENT:
      - card: Kart konteynırı ve kenarlık oluşturur.
      - shadow-md: Karta orta seviye gölge efekti vererek derinlik katar.
    */
    <div className='card shadow-md'>
      {/* 
        EXPRESSIONS (JSX İfadeleri) & BOOTSTRAP STYLES:
        - JSX içinde {} açarak JavaScript string birleştirmesi yapılmış: "/img/" + productObj.image
        - card-img-top: Görseli kartın üst kısmına sabitler.
        - p-2 p-md-3: Görsel etrafına iç boşluk (padding) ekler.
        - border-bottom: Görselin altına ayırıcı çizgi çeker.
      */}
      <img className='card-img-top p-2 p-md-3 border-bottom' src={"/img/" + productObj.image} alt='' />
      
      {/* card-body: Kartın metin ve içerik alanı */}
      <div className='card-body'>
        {/* Dynamic Expressions: Prop'tan gelen metin ifadeleri basılıyor */}
        <h2 className='card-title'>{productObj.title}</h2>
        <p className='card-text'>{productObj.description}</p>
        
        {/* 
          BOOTSTRAP BADGE COMPONENT:
          - badge: Küçük etiket tasarımı sağlar.
          - text-bg-success: Yeşil renkli arka plan ve beyaz metin uygular.
        */}
        <span className='badge text-bg-success'>{productObj.price} TL</span>
      </div>
    </div> 
  )
}

/* ============================================================================
   CHILD BİLEŞEN: Footer
   - App bileşeninin CHILD'ıdır.
   - Zaman mantığı çalıştırarak mağazanın açık/kapalı olma durumunu hesaplar.
   ============================================================================ */
function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 17;

  /* 
    MANTIKSAL İFADE (LOGICAL EXPRESSION):
    Mevcut saat, açılış ve kapanış saatleri arasında mı? 
    Sonuç true veya false döner.
  */
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log("Mağaza Açık mı?:", isOpen);
  
  return (
    <footer>
      {/* 
        KOŞULLU DURUM 3 (TERNARY OPERATOR):
        - EĞER isOpen === true ise ➔ Sipariş verilebilir yazısını bas.
        - DEĞİLSE ➔ Kapalıyız yazısını bas.
      */}
      {
        isOpen ? (
          <p>Akşam {closeHour}'a kadar sipariş verebilirsiniz.</p>
        ) : (
          <p>Şu an kapalıyız, açılış saatimiz {openHour}'de sipariş verebilirsiniz.</p>
        )
      }
    </footer>
  )
}

// UYGULAMANIN RENDER EDİLMESİ (ENTRY POINT)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)