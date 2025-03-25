const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a'); // Seleksi semua tautan di dalam menu

hamburger.addEventListener('click', function () {
    // Toggle ikon antara 'bx-menu' dan 'bx-x'
    if (hamburger.classList.contains('bx-menu')) {
        hamburger.classList.remove('bx-menu');
        hamburger.classList.add('bx-x');
    } else {
        hamburger.classList.remove('bx-x');
        hamburger.classList.add('bx-menu');
    }

    // Tampilkan atau sembunyikan menu
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

// Tambahkan event listener pada setiap tautan di dalam menu
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Sembunyikan menu
        menu.classList.add('hidden');
        menu.classList.remove('flex');

        // Kembalikan ikon ke 'bx-menu'
        hamburger.classList.remove('bx-x');
        hamburger.classList.add('bx-menu');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ambil semua elemen navbar
    const navLinks = document.querySelectorAll(".nav-link");
    const homeLink = document.querySelector(".nav-link-active"); // Tautan "Home"
    const logoLink = document.querySelector("a.w-16"); // Logo toko
  
    // Saat halaman dimuat, arahkan ke bagian atas (#)
    if (window.location.hash !== "#") {
      window.location.href = "#";
    }
  
    // Tambahkan event listener untuk setiap elemen navbar
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Hapus active class dari semua link
        navLinks.forEach((item) => item.classList.remove("nav-link-active"));
  
        // Tambahkan active class ke link yang diklik
        this.classList.add("nav-link-active");
      });
    });
  
    // Tambahkan event listener ke logo toko
    logoLink.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah perilaku default tautan
      // Hapus active class dari semua link
      navLinks.forEach((item) => item.classList.remove("nav-link-active"));
  
      // Tambahkan active class hanya ke "Home"
      homeLink.classList.add("nav-link-active");
  
      // Scroll ke atas halaman
      window.location.href = "#";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          const navHeight = document.querySelector("nav").offsetHeight; // Dapatkan tinggi navbar

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - navHeight, // Kurangi tinggi navbar
                  behavior: "smooth"
              });
          }
      });
  });




    function openModalImage(imageSrc) {
      console.log("Modal Gambar Dibuka:", imageSrc); // Debugging
      document.getElementById("modalImage").src = imageSrc;
      document.getElementById("imageModal").classList.remove("hidden");
  }
  
  function closeModalImage() {
      console.log("Modal Gambar Ditutup"); // Debugging
      document.getElementById("imageModal").classList.add("hidden");
  }
  
  
  function openModalProduct(productName) {
    console.log("Modal Produk Dibuka:", productName); // Debugging
    document.getElementById("modalProductName").innerText = productName;
    document.getElementById("buyModal").classList.remove("hidden");
    }

    function closeModalProduct() {
        console.log("Modal Produk Ditutup"); // Debugging
        document.getElementById("buyModal").classList.add("hidden");
    }

    document.addEventListener("DOMContentLoaded", function () {
        // DATA PRODUK
        const products = [
            { id: 1, name: "Wardah-Lipstick Matte-120ml", category: "kosmetik", price: 12000, discount: false, oldPrice: null, sold: 25, image: "https://picsum.photos/300?random=1" },
            { id: 2, name: "Parfum Vanilla", category: "parfum", price: 24990, discount: false, oldPrice: null, sold: 10, image: "https://picsum.photos/300?random=2" },
            { id: 3, name: "Eyeliner Waterproof MS GLOW MEN 120ml", category: "kosmetik", price: 12990, discount: true, oldPrice: 19990, sold: 18, image: "https://picsum.photos/300?random=3" },
            { id: 4, name: "Cincin Emas", category: "aksesoris", price: 49990, discount: false, oldPrice: null, sold: 5, image: "https://picsum.photos/300?random=4" },
            { id: 5, name: "Blush On Natural", category: "kosmetik", price: 15990, discount: true, oldPrice: 20990, sold: 22, image: "https://picsum.photos/300?random=5" },
            { id: 6, name: "Parfum Ocean Blue", category: "parfum", price: 29990, discount: false, oldPrice: null, sold: 14, image: "https://picsum.photos/300?random=6" },
            { id: 7, name: "Kalung Berlian", category: "aksesoris", price: 99990, discount: true, oldPrice: 129990, sold: 7, image: "https://picsum.photos/300?random=7" },
            { id: 8, name: "Kalung Berlian", category: "aksesoris", price: 99990, discount: true, oldPrice: 129990, sold: 7, image: "https://picsum.photos/300?random=7" },
            { id: 9, name: "Kalung Berlian", category: "aksesoris", price: 99990, discount: true, oldPrice: 129990, sold: 7, image: "https://picsum.photos/300?random=7" },
            { id: 10, name: "Kalung Berlian", category: "aksesoris", price: 99990, discount: true, oldPrice: 129990, sold: 7, image: "https://picsum.photos/300?random=7" },
            { id: 11, name: "Kalung Berlian", category: "aksesoris", price: 99990, discount: true, oldPrice: 129990, sold: 7, image: "https://picsum.photos/300?random=7" },
        ];
    
        let currentPage = 1;
        const itemsPerPage = 4;
    
        // Ambil elemen dari DOM
        const productContainer = document.getElementById("productContainer");
        const searchInput = document.getElementById("searchInput");
        const categoryFilter = document.getElementById("categoryFilter");
        const paginationNumbers = document.getElementById("paginationNumbers");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
    
        if (!productContainer || !searchInput || !categoryFilter || !paginationNumbers || !prevBtn || !nextBtn) {
            console.error("Satu atau lebih elemen tidak ditemukan di DOM.");
            return;
        }
    
        // Event Listener untuk filter
        searchInput.addEventListener("input", filterProducts);
        categoryFilter.addEventListener("change", filterProducts);
    
        function filterProducts() {
            currentPage = 1; // Reset ke halaman pertama saat filter diubah
            displayProducts();
        }
    
        function displayProducts() {
            productContainer.innerHTML = "";
    
            const searchQuery = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
    
            // Filter produk berdasarkan kategori dan pencarian
            let filteredProducts = products.filter(p => 
                (selectedCategory === "all" || p.category === selectedCategory) &&
                p.name.toLowerCase().includes(searchQuery)
            );
    
            console.log("Filtered Products:", filteredProducts); // Debugging
    
            // Hitung total halaman
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            currentPage = Math.min(currentPage, totalPages) || 1;
    
            // Potong produk berdasarkan halaman saat ini
            const start = (currentPage - 1) * itemsPerPage;
            const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);
    
            // Render produk
            paginatedProducts.forEach(product => {
                productContainer.innerHTML += `
                    <div class="relative bg-white rounded-xl border p-4 transition-all duration-300 hover:shadow-lg h-[340px] flex flex-col justify-between font-montserrat">
                        <span class="absolute top-2 left-2 bg-[#379777] text-white text-xs font-medium px-2 py-1 rounded-lg">
                            ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                        ${product.discount ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-lg">Diskon</span>` : ''}
                        <img src="${product.image}" alt="${product.name}" class="w-full h-36 object-cover mb-3 rounded-lg aspect-[4/3]" />
                        <h3 class="text-sm font-semibold text-[#45474B] mb-1 font-montserrat">${product.name}</h3>
                        <div class="flex justify-between items-center">
                            <div class="flex flex-col">
                                ${product.discount ? `<span class="text-xs text-gray-400 line-through italic">Rp ${product.oldPrice.toLocaleString()}</span>` : ''}
                                <span class="text-sm font-semibold text-[#379777] font-montserrat">Rp ${product.price.toLocaleString()}</span>
                            </div>
                            <p class="text-xs text-gray-500">Terjual: ${product.sold} pcs</p>
                        </div>
                        <button onclick="openModalProduct('${product.name}')" class="mt-3 flex items-center justify-center gap-2 bg-[#379777] text-white px-4 py-2 rounded-lg text-xs font-semibold font-montserrat transition-all duration-300 hover:bg-[#2E7562]">
                            <i class='bx bx-shopping-bag text-base'></i> Beli Sekarang
                        </button>
                    </div>
                `;
            });
    
            updatePagination(totalPages);
        }
    
        function updatePagination(totalPages) {
            paginationNumbers.innerHTML = "";
    
            for (let i = 1; i <= totalPages; i++) {
                let pageBtn = document.createElement("button");
                pageBtn.innerText = i;
                pageBtn.className = `w-8 h-8 rounded-lg transition duration-300 text-sm ${
                    i === currentPage ? 'bg-white text-[#379777]' : 'bg-[#379777] text-white hover:bg-white border-[1.5px] border-white hover:text-[#379777]'
                }`;
                pageBtn.onclick = function () { goToPage(i, totalPages); };
                paginationNumbers.appendChild(pageBtn);
            }
    
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage >= totalPages;
        }
    
        function goToPage(page, totalPages) {
            currentPage = Math.max(1, Math.min(page, totalPages));
            displayProducts();
        }
    
        prevBtn.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
            }
        });
    
        nextBtn.addEventListener("click", function () {
            let filteredProducts = products.filter(p => 
                (categoryFilter.value === "all" || p.category === categoryFilter.value) &&
                p.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
            }
        });
    
        // Panggil saat pertama kali
        displayProducts();
    });
    