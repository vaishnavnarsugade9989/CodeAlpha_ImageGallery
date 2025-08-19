document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let currentImageIndex = 0;
  let filteredImages = []; // To store images after filtering

  // Define your images here.
  // IMPORTANT: Make sure these paths match your actual image files
  // Add more images as needed with their category.
  const imagesData = [
    {
      src: "images/majestic mountain.jpg",
      alt: "Majestic Mountains",
      category: "nature",
    },
    {
      src: "images/Vibrant Cityscape.jpg",
      alt: "Vibrant Cityscape",
      category: "city",
    },
    {
      src: "images/Abstract Art.jpg",
      alt: "Abstract Art",
      category: "abstract",
    },
    {
      src: "images/Lush Green Forest.jpg",
      alt: "Lush Green Forest",
      category: "nature",
    },
    {
      src: "images/Urban Night Lights.jpg",
      alt: "Urban Night Lights",
      category: "city",
    },
    {
      src: "images/Geometric Patterns.jpg",
      alt: "Geometric Patterns",
      category: "abstract",
    },
    {
      src: "images/Serene Lake View.jpg",
      alt: "Serene Lake View",
      category: "nature",
    },
    {
      src: "images/Busy Street Scene.jpg",
      alt: "Busy Street Scene",
      category: "city",
    },
    {
      src: "images/Colorful Swirls.jpg",
      alt: "Colorful Swirls",
      category: "abstract",
    },
    {
      src: "images/Sunset Over Hills.jpg",
      alt: "Sunset Over Hills",
      category: "nature",
    },
  ];

  function loadGalleryImages(imagesToLoad) {
    galleryGrid.innerHTML = ""; // Clear existing images
    imagesToLoad.forEach((imageData, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
      galleryItem.dataset.category = imageData.category; // Add data-category for filtering
      galleryItem.dataset.index = index; // Store original index for lightbox

      const img = document.createElement("img");
      img.src = imageData.src;
      img.alt = imageData.alt;

      galleryItem.appendChild(img);
      galleryGrid.appendChild(galleryItem);

      galleryItem.addEventListener("click", () => {
        openLightbox(imageData.src, imageData.alt, index);
      });
    });
    filteredImages = imagesToLoad; // Update filteredImages with current view
  }

  // Initial load of all images
  loadGalleryImages(imagesData);

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Remove 'active' class from all buttons and add to the clicked one
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filtered = imagesData.filter((imageData) => {
        return filter === "all" || imageData.category === filter;
      });
      loadGalleryImages(filtered);
    });
  });

  // Lightbox functions
  function openLightbox(src, alt, index) {
    lightbox.style.display = "flex"; // Use flex to center content
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    captionText.textContent = alt;
    currentImageIndex = imagesData.indexOf(filteredImages[index]); // Get the actual index from the original imagesData array
    updateLightboxImage();
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function updateLightboxImage() {
    if (filteredImages.length === 0) return; // No images to display

    const imgData = filteredImages[currentImageIndex];
    lightboxImg.src = imgData.src;
    lightboxImg.alt = imgData.alt;
    captionText.textContent = imgData.alt;
  }

  window.plusSlides = (n) => {
    currentImageIndex =
      (currentImageIndex + n + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
  };

  // Close lightbox on button click
  closeBtn.addEventListener("click", closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        window.plusSlides(-1);
      } else if (e.key === "ArrowRight") {
        window.plusSlides(1);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
});
