/**
 * Main JavaScript for USC Front End Web Programming
 * Week 07 - jQuery Examples
 */

$(document).ready(function () {
  // =====================================================
  // Dark Mode Toggle
  // =====================================================

  // Check if user has a preference saved
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    $("#theme-stylesheet").attr("href", "assets/css/style-dark.css");
    $("#dark-mode-toggle").text("☀️ Light Mode");
  }

  // Toggle dark mode when button is clicked
  $("#dark-mode-toggle").click(function () {
    const currentStylesheet = $("#theme-stylesheet").attr("href");

    if (currentStylesheet === "assets/css/style.css") {
      // Switch to dark mode
      $("#theme-stylesheet").attr("href", "assets/css/style-dark.css");
      $(this).text("☀️ Light Mode");
      localStorage.setItem("theme", "dark");
    } else {
      // Switch to light mode
      $("#theme-stylesheet").attr("href", "assets/css/style.css");
      $(this).text("🌙 Dark Mode");
      localStorage.setItem("theme", "light");
    }
  });

  // =====================================================
  // JakeSpurlock.com API
  // =====================================================

  // Fetch JakeSpurlock.com posts
  $.ajax({
    url: "https://jakespurlock.com/wp-json/wp/v2/posts",
    method: "GET",
    dataType: "json",
    data: {
      per_page: 5, // Fetch 5 most recent posts
      _embed: true, // Include embedded data
    },
    success: function (posts) {
      // Clear loading message
      $("#news-posts-container").empty();

      // Check if posts exist
      if (posts.length === 0) {
        $("#news-posts-container").html(
          "<p>No news posts available at this time.</p>"
        );
        return;
      }

      // Create a card for each post
      posts.forEach(function (post) {
        // Extract post data
        const title = post.title.rendered;
        const excerpt = post.excerpt.rendered;
        const link = post.link;
        const date = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Get featured image URL if available
        const featuredImageUrl = post.jetpack_featured_media_url || "";

        // Create image HTML if featured image exists
        const imageHTML = featuredImageUrl
          ? `<img src="${featuredImageUrl}" alt="${title}" class="news-card-image" loading="lazy">`
          : "";

        // Create card HTML
        const cardHTML = `
          <div class="news-card">
            ${imageHTML}
            <div class="news-card-header">
              <h4 class="news-card-title">${title}</h4>
              <span class="news-card-toggle">▼</span>
            </div>
            <div class="news-card-content">
              <div class="news-card-date">${date}</div>
              <div class="news-card-excerpt">${excerpt}</div>
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="news-card-link">Read Full Article →</a>
            </div>
          </div>
        `;

        // Append card to container
        $("#news-posts-container").append(cardHTML);
      });

      // Add click handler to toggle cards
      $(".news-card").click(function () {
        $(this).toggleClass("expanded");
      });
    },
    error: function () {
      // Show error message
      $("#news-posts-container").html(
        '<p style="color: var(--text-medium);">Unable to load recent posts at this time. Please try again later.</p>'
      );
      console.error("Error fetching recent posts");
    },
  });
});
