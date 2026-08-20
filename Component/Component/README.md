# 📱 Ürün Listeleme Uygulaması (Product List App)

Bu proje, **React** temel kavramlarını (Component Hiyerarşisi, Props Yapısı ve JSX Expressions) pekiştirmek amacıyla geliştirilmiş bir temel web uygulamasıdır.

---

## 🛠️ Kullanılan Teknolojiler

* **React 18** (Functional Components, Props)
* **Vite / ReactDOM** (Render & Build Tool)
* **JavaScript (ES6+)** (Objects, Arrays, Expressions)

---

## 🏗️ Bileşen Mimarisi (Component Hierarchy)

Uygulama, sorumlulukların ayrılması (Separation of Concerns) ilkesine uygun olarak 3 temel bileşenden oluşmaktadır:


### 1. `App.jsx` (Root Component)
* Uygulamanın ana giriş noktasıdır (Parent).
* `<Header />` ve `<ProductList />` bileşenlerini tek bir kök altında birleştirir.

### 2. `Header.jsx`
* Sayfanın başlık bölümünü çizen pasif (statik) alt bileşendir (Child).

### 3. `ProductList.jsx`
* Ürün verilerini (`items` dizisi) bünyesinde barındırır.
* Ürün bilgilerini alt bileşen olan `<Product />` bileşenine **props** kanalıyla aktarır.

### 4. `Product.jsx`
* Dışarıdan gelen `props` objesini kabul eder.
* JSX içinde `{}` (Expressions) kullanarak dinamik olarak ürün resmini, başlığını, açıklamasını ve fiyatını ekrana çizer.

---

## 🔑 Öne Çıkan Kavramlar & İfadeler (Expressions)

* **Props Aktarımı:** Veriler parent bileşenden child bileşene `title={items[0].title}` şeklinde aktarılmıştır.
* **JSX Expressions:** Metin ve sayısal değerler JSX içerisinde `{props.title}` ve `{props.price}` ifadeleriyle dinamik hale getirilmiştir.
* **String Birleştirme:** Görsel yolları public klasöre referans verecek şekilde `src={"/img/" + props.image}` ifadesiyle oluşturulmuştur.
