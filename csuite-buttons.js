(function () {
  "use strict";

  console.log("C-Suite Network Button Injector - Starting v2.3...");
  console.log("CP:1 Script loaded successfully");

  // Configuration
  const config = {
    targetPath: "/communities/groups/contributor-membersfor-executi/",
    checkInterval: 1000,
    maxRetries: 10,
    retryDelay: 500,
    wordpressApiUrl: "https://c-suitenetwork.com/wp-json/ghl-publish/v1/post",
    maxCategories: 4,
    buttons: [
      {
        text: "Contribute an Article",
        url: "https://connect.c-suitenetwork.com/widget/form/3nVzrxRj4hzBYX0owWm7",
        useCustomForm: true,
        id: "contribute-article-btn"
      },
      {
        text: "Update your Podcast",
        url: "https://cms.megaphone.fm/",
        useCustomForm: false,
        id: "publish-podcast-btn"
      },
      {
        text: "Launch a Show",
        url: "https://connect.c-suitenetwork.com/widget/booking/8JmDdTxyOwpxIMZSnyCw",
        useCustomForm: false,
        id: "launch-tv-btn"
      }
    ],
    categories: [
      "News",
      "Accounting",
      "Advice",
      "Art",
      "Best Practices",
      "Biography and History",
      "Body Language",
      "Branding",
      "Capital",
      "Case Studies",
      "Comedy",
      "Culture",
      "Economics",
      "Entrepreneurship",
      "Geopolitics",
      "Geopolitics and History",
      "Growth",
      "Health and Wellness",
      "Human Resources",
      "Industries",
      "Industry Insights",
      "Innovation",
      "Investing",
      "IT",
      "Keynote Speaker",
      "Leadership",
      "Management",
      "Marketing",
      "Mergers & Acquisition",
      "Negotiating",
      "Negotiations",
      "Networking",
      "News and Politics",
      "Operations",
      "Other",
      "Parenting",
      "Personal Development",
      "Real Estate",
      "Sales",
      "Sales Training",
      "Skills",
      "Sports",
      "Spotlight",
      "Strategy",
      "Taxes",
      "Technology",
      "Travel",
      "Wealth",
      "Women In Business"
    ]
  };

  let buttonInjected = false;
  let lastURL = "";
  let stylesInjected = false;
  let retryCount = 0;

  console.log("CP:2 Configuration loaded");

  // Debug function with checkpoint system
  function debug(message, data) {
    const timestamp = new Date().toISOString();
    const checkpoint = message.startsWith("CP:") ? " [CHECKPOINT]" : "";
    if (data !== undefined && data !== null) {
      console.log("[" + timestamp + "] C-Suite" + checkpoint + ": " + message, data);
    } else {
      console.log("[" + timestamp + "] C-Suite" + checkpoint + ": " + message);
    }
  }

  debug("CP:3 Debug function defined");

  // Inject styles once
  function injectStyles() {
    if (stylesInjected) return;

    debug("CP:4 Attempting to inject styles");

    const styleSheet = document.createElement("style");
    styleSheet.id = "article-form-styles";
    
    styleSheet.textContent = `
      .contribute-btn-container {
        margin: 30px auto !important;
        max-width: 600px !important;
        padding: 25px !important;
        background: #f9f9f9 !important;
        border-radius: 10px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        border: 2px solid #e20608 !important;
      }
      
      .custom-contribute-btn {
        display: block !important;
        background: #e20608 !important;
        color: white !important;
        padding: 12px 24px !important;
        margin: 10px auto !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        border: 2px solid #e20608 !important;
        font-size: 14px !important;
        width: 200px !important;
        transition: all 0.3s ease !important;
        text-align: center !important;
      }
      
      .custom-contribute-btn:hover {
        background: white !important;
        color: #e20608 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 15px rgba(226, 6, 8, 0.3) !important;
      }

      #article-submission-form input[type="email"],
      #article-submission-form input[type="text"],
      #article-submission-form input[type="datetime-local"],
      #article-submission-form select,
      #article-submission-form textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.3s;
        box-sizing: border-box;
      }
      
      #article-submission-form input[type="email"]:focus,
      #article-submission-form input[type="text"]:focus,
      #article-submission-form input[type="datetime-local"]:focus,
      #article-submission-form select:focus {
        outline: none;
        border-color: #e20608;
      }
      
      #article-submission-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
      }
      
      #article-submission-form .form-group {
        margin-bottom: 20px;
      }
      
      #article-submission-form .required {
        color: #e20608;
      }
      
      #article-submission-form button {
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        font-size: 14px;
      }
      
      #article-submission-form .submit-btn {
        background: #e20608;
        color: white;
      }
      
      #article-submission-form .submit-btn:hover:not(:disabled) {
        background: #c00507;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(226, 6, 8, 0.3);
      }
      
      #article-submission-form .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      #article-submission-form .cancel-btn {
        background: #f5f5f5;
        color: #333;
        margin-right: 10px;
      }
      
      #article-submission-form .cancel-btn:hover {
        background: #e0e0e0;
      }
      
      .article-image-preview {
        margin-top: 10px;
        max-width: 200px;
        border-radius: 6px;
        display: none;
      }
      
      .article-image-preview img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        border: 1px solid #ddd;
      }
      
      .article-categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin-top: 10px;
        max-height: 200px;
        overflow-y: auto;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }
      
      .article-category-checkbox {
        display: flex;
        align-items: center;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .article-category-checkbox:hover {
        background: #f5f5f5;
      }
      
      .article-category-checkbox input[type="checkbox"] {
        width: auto !important;
        margin-right: 8px;
        padding: 0 !important;
      }
      
      .article-category-checkbox.selected {
        background: #fee;
        border-color: #e20608;
      }
      
      .article-category-checkbox.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .category-counter {
        color: #666;
        font-weight: normal;
        margin-left: 10px;
        font-size: 14px;
      }
      
      .category-limit-warning {
        color: #e20608;
        font-size: 14px;
        margin-top: 5px;
        display: none;
      }
      
      #editor-container {
        height: 300px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }
      
      .ql-toolbar {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      
      .ql-container {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        font-size: 14px;
      }
      
      .article-close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .article-close-btn:hover {
        color: #333;
      }
      
      .article-form-header {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
      }
      
      .article-form-logo {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        background: #e20608;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 18px;
      }
      
      .success-message {
        text-align: center;
        padding: 40px;
      }
      
      .success-icon {
        width: 60px;
        height: 60px;
        background: #28a745;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 30px;
      }
      
      .success-title {
        font-size: 24px;
        color: #333;
        margin-bottom: 15px;
        font-weight: 600;
      }
      
      .success-text {
        font-size: 16px;
        color: #666;
        line-height: 1.5;
        margin-bottom: 30px;
      }
      
      .success-close-btn {
        background: #e20608;
        color: white;
        padding: 12px 40px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .success-close-btn:hover {
        background: #c00507;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(226, 6, 8, 0.3);
      }
    `;
    
    document.head.appendChild(styleSheet);
    stylesInjected = true;
    debug("CP:5 Styles injected successfully");
  }

  debug("CP:6 Function definitions starting");

  // Load Quill Rich Text Editor
  function loadQuillEditor() {
    if (window.Quill) {
      debug("Quill already loaded");
      return Promise.resolve();
    }

    debug("Loading Quill editor...");
    return new Promise((resolve) => {
      const quillCSS = document.createElement("link");
      quillCSS.rel = "stylesheet";
      quillCSS.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
      document.head.appendChild(quillCSS);

      const quillJS = document.createElement("script");
      quillJS.src = "https://cdn.quilljs.com/1.3.6/quill.js";
      quillJS.onload = () => {
        debug("Quill loaded successfully");
        resolve();
      };
      document.head.appendChild(quillJS);
    });
  }

  // Show success message
  function showSuccessMessage(popup) {
    popup.innerHTML = "";

    const successDiv = document.createElement("div");
    successDiv.className = "success-message";

    const icon = document.createElement("div");
    icon.className = "success-icon";
    icon.innerHTML = "✓";

    const title = document.createElement("div");
    title.className = "success-title";
    title.textContent = "Success!";

    const text = document.createElement("div");
    text.className = "success-text";
    text.textContent = "Thank you for submitting your article to C-Suitenetwork.com! We have received your article and it is scheduled for review and approval.";

    const closeBtn = document.createElement("button");
    closeBtn.className = "success-close-btn";
    closeBtn.textContent = "Close";
    closeBtn.onclick = () => {
      document.getElementById("article-form-overlay").remove();
    };

    successDiv.appendChild(icon);
    successDiv.appendChild(title);
    successDiv.appendChild(text);
    successDiv.appendChild(closeBtn);

    popup.appendChild(successDiv);
    debug("Success message displayed");
  }

  debug("CP:7 Basic functions defined");

  // Create custom article submission form
  function createCustomArticleForm() {
    debug("CP:8 Creating custom article form...");
    
    // Inject styles first
    injectStyles();

    loadQuillEditor().then(() => {
      debug("CP:9 Quill promise resolved, creating form");
      
      // Create overlay
      const overlay = document.createElement("div");
      overlay.id = "article-form-overlay";
      overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;justify-content:center;align-items:center;overflow-y:auto;padding:20px;";

      // Create popup container
      const popup = document.createElement("div");
      popup.id = "article-popup";
      popup.style.cssText = "background:white;padding:30px;border-radius:12px;width:100%;max-width:1000px;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,0.2);position:relative;";

      // Create close button
      const closeBtn = document.createElement("button");
      closeBtn.className = "article-close-btn";
      closeBtn.innerHTML = "×";
      closeBtn.onclick = () => {
        overlay.remove();
        debug("Form closed by user");
      };
      popup.appendChild(closeBtn);

      // Create header
      const header = document.createElement("div");
      header.className = "article-form-header";

      const logo = document.createElement("div");
      logo.className = "article-form-logo";
      logo.textContent = "C";

      const title = document.createElement("h2");
      title.style.cssText = "margin:0;color:#333;font-size:24px;";
      title.textContent = "Submit Your Article to C-Suite Network";

      header.appendChild(logo);
      header.appendChild(title);
      popup.appendChild(header);

      // Create form
      const form = document.createElement("form");
      form.id = "article-submission-form";

      // Email field
      const emailGroup = document.createElement("div");
      emailGroup.className = "form-group";
      const emailLabel = document.createElement("label");
      emailLabel.innerHTML = 'Email Address <span class="required">*</span>';
      const emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.name = "email";
      emailInput.required = true;
      emailInput.placeholder = "your@email.com";
      emailGroup.appendChild(emailLabel);
      emailGroup.appendChild(emailInput);
      form.appendChild(emailGroup);

      // Title field
      const titleGroup = document.createElement("div");
      titleGroup.className = "form-group";
      const titleLabel = document.createElement("label");
      titleLabel.innerHTML = 'Article Title <span class="required">*</span>';
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.name = "title";
      titleInput.required = true;
      titleInput.placeholder = "Enter your article title";
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);
      form.appendChild(titleGroup);

      // Body field with Quill
      const bodyGroup = document.createElement("div");
      bodyGroup.className = "form-group";
      const bodyLabel = document.createElement("label");
      bodyLabel.innerHTML = 'Article Body <span class="required">*</span>';
      const editorContainer = document.createElement("div");
      editorContainer.id = "editor-container";
      const bodyHidden = document.createElement("input");
      bodyHidden.type = "hidden";
      bodyHidden.name = "body";
      bodyHidden.id = "article-body";
      bodyGroup.appendChild(bodyLabel);
      bodyGroup.appendChild(editorContainer);
      bodyGroup.appendChild(bodyHidden);
      form.appendChild(bodyGroup);

      // Image field
      const imageGroup = document.createElement("div");
      imageGroup.className = "form-group";
      const imageLabel = document.createElement("label");
      imageLabel.textContent = "Featured Image";
      const imageInput = document.createElement("input");
      imageInput.type = "file";
      imageInput.name = "featured_image";
      imageInput.id = "featured-image";
      imageInput.accept = "image/*";
      const imagePreview = document.createElement("div");
      imagePreview.className = "article-image-preview";
      imagePreview.id = "image-preview";
      const previewImg = document.createElement("img");
      previewImg.id = "preview-img";
      previewImg.alt = "Preview";
      imagePreview.appendChild(previewImg);
      imageGroup.appendChild(imageLabel);
      imageGroup.appendChild(imageInput);
      imageGroup.appendChild(imagePreview);
      form.appendChild(imageGroup);

      // Categories field with limiter
      const categoriesGroup = document.createElement("div");
      categoriesGroup.className = "form-group";

      const categoriesLabel = document.createElement("label");
      categoriesLabel.innerHTML = 'Categories <span class="required">*</span> (News is always included) <span class="category-counter" id="category-counter">A max of ' +
        config.maxCategories + ' categories can be selected.</span>';
      categoriesGroup.appendChild(categoriesLabel);

      // Add warning message for category limit
      const categoryWarning = document.createElement("div");
      categoryWarning.className = "category-limit-warning";
      categoryWarning.id = "category-warning";
      categoryWarning.textContent = "Maximum of " + config.maxCategories + " categories reached (in addition to News)";
      categoriesGroup.appendChild(categoryWarning);

      const categoriesGrid = document.createElement("div");
      categoriesGrid.className = "article-categories-grid";

      config.categories.forEach((cat) => {
        const label = document.createElement("label");
        label.className = "article-category-checkbox";
        if (cat === "News") label.classList.add("selected");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "categories";
        checkbox.value = cat;
        checkbox.className = "category-cb";
        if (cat === "News") {
          checkbox.checked = true;
          checkbox.disabled = true;
        }

        const span = document.createElement("span");
        span.textContent = cat;

        label.appendChild(checkbox);
        label.appendChild(span);
        categoriesGrid.appendChild(label);
      });

      categoriesGroup.appendChild(categoriesGrid);
      form.appendChild(categoriesGroup);

      // Date field
      const dateGroup = document.createElement("div");
      dateGroup.className = "form-group";
      const dateLabel = document.createElement("label");
      dateLabel.textContent = "Article Post Date";
      const dateInput = document.createElement("input");
      dateInput.type = "datetime-local";
      dateInput.name = "post_date";
      dateInput.id = "post-date";
      dateGroup.appendChild(dateLabel);
      dateGroup.appendChild(dateInput);
      form.appendChild(dateGroup);

      // Buttons
      const buttonGroup = document.createElement("div");
      buttonGroup.style.cssText = "display:flex;justify-content:flex-end;margin-top:30px;";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "cancel-btn";
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => {
        overlay.remove();
        debug("Form cancelled by user");
      };

      const submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.className = "submit-btn";
      submitBtn.textContent = "Submit Article";

      buttonGroup.appendChild(cancelBtn);
      buttonGroup.appendChild(submitBtn);
      form.appendChild(buttonGroup);

      // Message div
      const messageDiv = document.createElement("div");
      messageDiv.id = "form-message";
      messageDiv.style.cssText = "margin-top:15px;padding:12px;border-radius:6px;display:none;";
      form.appendChild(messageDiv);

      popup.appendChild(form);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      debug("CP:10 Form DOM created, initializing Quill...");

      // Initialize Quill after DOM is ready
      setTimeout(() => {
        const quill = new Quill("#editor-container", {
          theme: "snow",
          placeholder: "Write your article content here...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"]
            ]
          }
        });

        debug("CP:11 Quill editor initialized");

        // Set default date
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        document.getElementById("post-date").value = today.toISOString().slice(0, 16);

        // Category checkbox handlers with 4-category limiter
        categoriesGrid.querySelectorAll(".article-category-checkbox").forEach((label) => {
          const checkbox = label.querySelector("input");

          // For News checkbox, just keep it selected
          if (checkbox.value === "News") {
            label.classList.add("selected");
            return;
          }

          // Add change handler for all other categories
          checkbox.addEventListener("change", () => {
            // Count checked categories (excluding News)
            const allCategoryCheckboxes = categoriesGrid.querySelectorAll('input[type="checkbox"][name="categories"]');
            let checkedCount = 0;
            allCategoryCheckboxes.forEach((cb) => {
              if (cb.checked && cb.value !== "News") {
                checkedCount++;
              }
            });

            // Update counter display
            const counter = document.getElementById("category-counter");
            if (counter) {
              counter.textContent = checkedCount + " of " + config.maxCategories + " selected";
            }

            // If just checked this box and we're over the limit
            if (checkbox.checked && checkedCount > config.maxCategories) {
              // Uncheck it immediately
              checkbox.checked = false;
              alert("Maximum of " + config.maxCategories + " categories allowed (in addition to News)");

              // Recount and update display
              checkedCount--;
              if (counter) {
                counter.textContent = checkedCount + " of " + config.maxCategories + " selected";
              }
            }

            // Update visual state
            if (checkbox.checked) {
              label.classList.add("selected");
            } else {
              label.classList.remove("selected");
            }

            // Gray out unchecked boxes if at limit
            const warning = document.getElementById("category-warning");
            if (checkedCount >= config.maxCategories) {
              if (warning) warning.style.display = "block";

              // Disable unchecked boxes
              allCategoryCheckboxes.forEach((cb) => {
                if (!cb.checked && cb.value !== "News") {
                  cb.disabled = true;
                  cb.parentElement.style.opacity = "0.5";
                }
              });
            } else {
              if (warning) warning.style.display = "none";

              // Enable all boxes
              allCategoryCheckboxes.forEach((cb) => {
                if (cb.value !== "News") {
                  cb.disabled = false;
                  cb.parentElement.style.opacity = "1";
                }
              });
            }
          });
        });

        // Image preview handler
        document.getElementById("featured-image").addEventListener("change", function(e) {
          const file = e.target.files[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
              document.getElementById("preview-img").src = e.target.result;
              document.getElementById("image-preview").style.display = "block";
            };
            reader.readAsDataURL(file);
            debug("Image preview loaded");
          }
        });

        // Form submission handler
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          debug("Form submitted");

          const articleBody = quill.root.innerHTML;
          document.getElementById("article-body").value = articleBody;

          const formData = new FormData(form);

          const selectedCategories = [];
          form.querySelectorAll('input[name="categories"]:checked').forEach((cb) => {
            selectedCategories.push(cb.value);
          });

          await submitToWordPress(formData, selectedCategories, articleBody, popup);
        });
      }, 100);

      // ESC key handler
      const escHandler = (e) => {
        if (e.key === "Escape") {
          overlay.remove();
          document.removeEventListener("keydown", escHandler);
          debug("Form closed via ESC key");
        }
      };
      document.addEventListener("keydown", escHandler);

      // Overlay click handler
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.remove();
          debug("Form closed via overlay click");
        }
      });
    });
  }

  debug("CP:12 Form creation function defined");

  // Submit to WordPress API
  async function submitToWordPress(formData, categories, htmlBody, popup) {
    const messageDiv = document.getElementById("form-message");
    const submitBtn = document.querySelector(".submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    debug("CP:13 Submitting to WordPress...");

    try {
      let imageUrl = "";
      const imageFile = formData.get("featured_image");

      if (imageFile && imageFile.size > 0) {
        const base64 = await fileToBase64(imageFile);
        imageUrl = base64;
        debug("Image converted to base64");
      }

      // Format date properly for WordPress API (YYYY-MM-DD HH:MM:SS)
      let formattedDate = "";
      const postDate = formData.get("post_date");
      if (postDate) {
        const dateObj = new Date(postDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;
      }

      const data = {
        email: formData.get("email"),
        title: formData.get("title"),
        body: htmlBody,
        image_data: imageUrl,
        image_name: imageFile ? imageFile.name : "",
        categories: categories.join(","),
        post_date: formattedDate
      };

      debug("Sending data to API", data);

      const response = await fetch(config.wordpressApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      debug("API Response", result);

      if (response.ok && result.success) {
        showSuccessMessage(popup);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      debug("Submission error", error);
      messageDiv.style.display = "block";
      messageDiv.style.background = "#f8d7da";
      messageDiv.style.color = "#721c24";
      messageDiv.innerHTML = "✗ Error: " + error.message;

      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Article";
    }
  }

  // Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  debug("CP:14 Helper functions defined");

  // Check if on target page
  function isTargetPage() {
    const currentURL = window.location.href.toLowerCase();
    const currentPath = window.location.pathname.toLowerCase();

    // Debug current location
    debug("Checking URL:", {
      href: currentURL,
      pathname: currentPath,
      search: window.location.search,
      hash: window.location.hash
    });

    // Multiple checks for the target page
    const checks = [
      currentURL.includes("communities/groups/contributor"),
      currentPath.includes("/communities/groups/contributor"),
      currentURL.includes("contributor-membersfor-executi"),
      currentPath.includes("contributor-membersfor-executi"),
      currentPath.includes("/communities") && currentPath.includes("contributor"),
      currentPath.match(/\/communities\/groups\/[^\/]*contributor/i)
    ];

    const isMatch = checks.some((check) => check);
    debug("Page match result:", isMatch);

    return isMatch;
  }

  // Find injection points - IMPROVED VERSION
  function findInjectionPoints() {
    debug("CP:15 Looking for injection points...");

    // Look for the discussion/feed area first (bottom placement)
    const discussionArea = document.querySelector('.discussion-content, .feed-container, .posts-container, .timeline, .activity-feed');
    if (discussionArea) {
      debug("Found discussion/feed area for injection");
      return discussionArea;
    }

    // Enhanced selectors for GoHighLevel pages - REORDERED FOR BETTER PLACEMENT
    const possibleSelectors = [
      // Try main content areas first
      "main",
      '[role="main"]',
      ".main-content",
      ".content-wrapper",
      ".page-content",
      
      // Then try community/group content areas
      ".community-content",
      ".channel-content", 
      ".group-content",
      
      // Generic containers before headers
      ".container > div:first-child",
      "main > div:first-child",
      "body > div > div > main",
      
      // Headers should be lower priority
      ".channel-header",
      ".community-header",
      ".page-header",
      ".content-header",
      ".group-header",
      
      // ID selectors last (these might catch headers)
      '[id*="channel"]:not([id*="header"])',
      '[id*="community"]:not([id*="header"])',
      '[id*="group"]:not([id*="header"]):not([id*="info"])',
      '[class*="channel"]:not([class*="header"])',
      '[class*="community"]:not([class*="header"])',
      '[class*="group"]:not([class*="header"]):not([class*="info"])',
      
      // Vue/GHL specific
      "[data-v-*]",
      ".hl_wrapper",
      ".hl-wrapper",
      
      // Ultimate fallback
      ".content",
      "#app",
      "#main"
    ];

    // Try each selector
    for (const selector of possibleSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          // Check if element is visible, has reasonable dimensions, and is not in header
          if (element && 
              element.offsetWidth > 0 && 
              element.offsetHeight > 0 &&
              !element.querySelector("#custom-contribute-container") &&
              !element.id.includes("header") &&
              !element.className.includes("header") &&
              !element.id.includes("info") &&  // Avoid group-info
              !element.classList.contains("group-info")) {  // Also check classList
            debug(`Found injection point with selector: ${selector}`, element);
            return element;
          }
        }
      } catch (e) {
        // Selector might be invalid, continue
        continue;
      }
    }

    // Look for heading elements
    const headings = document.querySelectorAll("h1, h2, h3");
    for (const heading of headings) {
      const text = heading.textContent.toLowerCase();
      if (text.includes("contributor") || 
          text.includes("community") || 
          text.includes("group") ||
          text.includes("ask")) {
        // Get parent but avoid header containers
        let parent = heading.parentElement;
        while (parent && (parent.id.includes("header") || parent.className.includes("header"))) {
          parent = parent.parentElement;
        }
        if (parent) {
          debug("Found injection point via heading:", parent);
          return parent;
        }
      }
    }

    // Last resort - find main content area
    const fallback = document.querySelector("main") ||
      document.querySelector('[role="main"]') ||
      document.querySelector(".content") ||
      document.querySelector("#app") ||
      document.body.querySelector("div > div");

    if (fallback) {
      debug("Using fallback injection point:", fallback);
    } else {
      debug("No injection point found!");
    }

    return fallback;
  }

    // Try each selector
    for (const selector of possibleSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          // Check if element is visible, has reasonable dimensions, and is not in header
          if (element && 
              element.offsetWidth > 0 && 
              element.offsetHeight > 0 &&
              !element.querySelector("#custom-contribute-container") &&
              !element.id.includes("header") &&
              !element.className.includes("header") &&
              !element.id.includes("info") &&  // Avoid group-info
              !element.classList.contains("group-info")) {  // Also check classList
            debug(`Found injection point with selector: ${selector}`, element);
            return element;
          }
        }
      } catch (e) {
        // Selector might be invalid, continue
        continue;
      }
    }

    // Look for heading elements
    const headings = document.querySelectorAll("h1, h2, h3");
    for (const heading of headings) {
      const text = heading.textContent.toLowerCase();
      if (text.includes("contributor") || 
          text.includes("community") || 
          text.includes("group") ||
          text.includes("ask")) {
        // Get parent but avoid header containers
        let parent = heading.parentElement;
        while (parent && (parent.id.includes("header") || parent.className.includes("header"))) {
          parent = parent.parentElement;
        }
        if (parent) {
          debug("Found injection point via heading:", parent);
          return parent;
        }
      }
    }

    // Last resort - find main content area
    const fallback = document.querySelector("main") ||
      document.querySelector('[role="main"]') ||
      document.querySelector(".content") ||
      document.querySelector("#app") ||
      document.body.querySelector("div > div");

    if (fallback) {
      debug("Using fallback injection point:", fallback);
    } else {
      debug("No injection point found!");
    }

    return fallback;
  }

  debug("CP:16 Page detection functions defined");

  // Create inline buttons - IMPROVED STYLING
  function createInlineButton() {
    const container = document.createElement("div");
    container.className = "contribute-btn-container";
    container.id = "custom-contribute-container";
    // Better positioning and visibility
    container.style.cssText = "margin:30px auto;max-width:600px;padding:25px;background:#f9f9f9;border-radius:10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.15);border:2px solid #e20608;";

    // Add a title
    const title = document.createElement("h3");
    title.style.cssText = "margin:0 0 20px 0;color:#333;font-size:22px;font-weight:600;";
    title.textContent = "C-Suite Network Actions";
    container.appendChild(title);

    config.buttons.forEach((btnConfig) => {
      const button = document.createElement("button");
      button.className = "custom-contribute-btn";
      button.textContent = btnConfig.text;
      button.id = btnConfig.id;

      button.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        debug(`Button clicked: ${btnConfig.text}`);

        if (btnConfig.useCustomForm) {
          createCustomArticleForm();
        } else if (btnConfig.url) {
          window.open(btnConfig.url, "_blank");
        }
      };

      container.appendChild(button);
    });

    debug("CP:17 Button container created");
    return container;
  }

  debug("CP:18 About to define addButtons function");

  // Main button injection function
  function addButtons() {
    if (buttonInjected) {
      debug("Buttons already injected");
      return;
    }

    debug("CP:19 Starting button injection process");

    // IMPORTANT: Inject styles immediately when adding buttons
    injectStyles();

    const injectionPoint = findInjectionPoints();

    if (!injectionPoint) {
      retryCount++;
      debug(`No injection point found. Retry ${retryCount}/${config.maxRetries}`);

      if (retryCount < config.maxRetries) {
        setTimeout(() => addButtons(), config.retryDelay);
      } else {
        debug("Max retries reached. Could not inject buttons.");
      }
      return;
    }

    // Check if buttons already exist
    if (document.getElementById("custom-contribute-container")) {
      debug("Buttons already exist in DOM");
      buttonInjected = true;
      return;
    }

    const inlineButtons = createInlineButton();

    // Try different insertion methods - PRIORITIZE APPENDING (bottom placement)
    try {
      // Method 1: Append to the element (puts it at bottom)
      injectionPoint.appendChild(inlineButtons);
      debug("CP:20 Buttons injected using appendChild");
    } catch (e1) {
      try {
        // Method 2: Insert after the element
        injectionPoint.parentNode.insertBefore(inlineButtons, injectionPoint.nextSibling);
        debug("CP:20 Buttons injected using parentNode.insertBefore");
      } catch (e2) {
        try {
          // Method 3: Insert at the beginning (last resort)
          injectionPoint.insertBefore(inlineButtons, injectionPoint.firstChild);
          debug("CP:20 Buttons injected using insertBefore");
        } catch (e3) {
          debug("Failed to inject buttons:", e3);
          return;
        }
      }
    }

    buttonInjected = true;
    retryCount = 0;
    debug("CP:21 C-Suite Network action buttons successfully injected!");

    // Verify injection
    setTimeout(() => {
      const injected = document.getElementById("custom-contribute-container");
      if (injected) {
        debug("CP:22 Injection verified - buttons are visible");
      } else {
        debug("Injection verification failed - retrying");
        buttonInjected = false;
        addButtons();
      }
    }, 100);
  }

  debug("CP:23 addButtons function defined successfully");

  // Remove buttons
  function removeButtons() {
    const container = document.getElementById("custom-contribute-container");
    if (container) {
      container.remove();
      buttonInjected = false;
      debug("Buttons removed");
    }
  }

  // Check and inject with better timing
  function checkAndInject() {
    const currentURL = window.location.href;

    // Only process if URL changed
    if (currentURL === lastURL) return;

    lastURL = currentURL;
    debug("URL changed to:", currentURL);

    if (isTargetPage()) {
      debug("CP:24 Target page detected - attempting injection");
      retryCount = 0;

      // Wait a bit for page to render
      setTimeout(() => {
        addButtons();
      }, 500);

      // Also try again after a longer delay
      setTimeout(() => {
        if (!buttonInjected) {
          debug("Secondary injection attempt");
          addButtons();
        }
      }, 2000);
    } else {
      debug("Not on target page - removing buttons if present");
      removeButtons();
    }
  }

  debug("CP:25 Control functions defined");

  // Enhanced initialization
  function init() {
    debug("CP:26 Initializing C-Suite Network Button Injector");

    // Inject styles immediately on initialization
    injectStyles();

    // Initial check
    checkAndInject();

    // Set up periodic checks
    setInterval(checkAndInject, config.checkInterval);

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      // Check if we're on the target page and buttons aren't injected
      if (isTargetPage() && !buttonInjected) {
        debug("DOM mutation detected - checking for injection");

        // Debounce the injection attempt
        clearTimeout(window.injectionTimeout);
        window.injectionTimeout = setTimeout(() => {
          addButtons();
        }, 100);
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id"]
    });

    // Listen for navigation events
    window.addEventListener("popstate", () => {
      debug("Popstate event");
      setTimeout(checkAndInject, 100);
    });

    // Override history methods to detect navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(history, arguments);
      debug("PushState navigation");
      setTimeout(checkAndInject, 100);
    };

    history.replaceState = function() {
      originalReplaceState.apply(history, arguments);
      debug("ReplaceState navigation");
      setTimeout(checkAndInject, 100);
    };

    // Also listen for hash changes
    window.addEventListener("hashchange", () => {
      debug("Hash change event");
      checkAndInject();
    });

    debug("CP:27 Initialization complete");
  }

  debug("CP:28 Init function defined, preparing to start");

  // Start the script
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
    debug("CP:29 Waiting for DOMContentLoaded");
  } else {
    init();
    debug("CP:29 DOM already ready, initializing immediately");
  }

  // Export for debugging in console
  window.CSuiteDebug = {
    config,
    isTargetPage,
    findInjectionPoints,
    addButtons,
    checkAndInject,
    buttonInjected: () => buttonInjected,
    retryCount: () => retryCount
  };

  debug("CP:30 Script fully loaded - CSuiteDebug available in console");
})();