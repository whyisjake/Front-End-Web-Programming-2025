/**
 * YouTube Data API v3 Integration
 * Week 07 - jQuery Examples
 *
 * Instructions to get your YouTube API key:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project (or select existing)
 * 3. Enable "YouTube Data API v3"
 * 4. Go to "Credentials" and create an API key
 * 5. Copy the API key and paste it below
 *
 * To find your YouTube Channel ID:
 * 1. Go to your YouTube channel
 * 2. Click "View channel"
 * 3. Look at the URL - it will be: youtube.com/channel/YOUR_CHANNEL_ID
 *    OR if you have a custom URL: youtube.com/@username
 * 4. If you have @username, you can use the channel lookup below
 */

$(document).ready(function () {
  // =====================================================
  // CONFIGURATION - Add your credentials here
  // =====================================================

  const YOUTUBE_API_KEY = "AIzaSyAZ61Vx3KrIhqdNix2SN4uyUjly8JZ_JRQ"; // Replace with your actual API key
  const CHANNEL_ID = "UCE0A0aAd2ZRuEjiyU3bbN2Q"; // Replace with your channel ID
  // OR use channel username:
  const CHANNEL_USERNAME = "@JakeSpurlock"; // Your @username without the @

  // Set to true if using username instead of channel ID
  const USE_USERNAME = false;

  // =====================================================
  // YouTube API Functions
  // =====================================================

  // Check if API key is configured
  if (YOUTUBE_API_KEY === "YOUR_API_KEY_HERE") {
    $("#videos-container").html(`
      <div class="error-message">
        <strong>YouTube API Key Required</strong>
        <p>To display videos, you need to:</p>
        <ol>
          <li>Get a free API key from <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
          <li>Enable the YouTube Data API v3</li>
          <li>Add your API key to <code>assets/js/youtube.js</code></li>
        </ol>
        <p><a href="https://developers.google.com/youtube/v3/getting-started" target="_blank">View YouTube API Documentation</a></p>
      </div>
    `);
    return;
  }

  // Function to fetch videos
  function fetchYouTubeVideos() {
    const searchParam = USE_USERNAME
      ? `forUsername=${CHANNEL_USERNAME}`
      : `channelId=${CHANNEL_ID}`;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&${searchParam}&order=date&maxResults=12&type=video&key=${YOUTUBE_API_KEY}`;

    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (response) {
        displayVideos(response.items);
      },
      error: function (xhr) {
        let errorMessage = "Unable to load videos from YouTube.";

        if (xhr.status === 403) {
          errorMessage =
            "API key error. Please check your YouTube API key and make sure the YouTube Data API v3 is enabled.";
        } else if (xhr.status === 400) {
          errorMessage =
            "Invalid request. Please check your channel ID or username.";
        }

        $("#videos-container").html(`
          <div class="error-message">
            <strong>Error:</strong> ${errorMessage}
            <p>Status Code: ${xhr.status}</p>
          </div>
        `);
        console.error("YouTube API Error:", xhr);
      },
    });
  }

  // Function to display videos
  function displayVideos(videos) {
    $("#videos-container").empty();

    if (videos.length === 0) {
      $("#videos-container").html("<p>No videos found.</p>");
      return;
    }

    videos.forEach(function (video) {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const description = video.snippet.description;
      const thumbnail = video.snippet.thumbnails.high.url; // Use high quality thumbnail
      const publishedAt = new Date(
        video.snippet.publishedAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const videoCard = `
        <div class="video-card" data-video-id="${videoId}">
          <div class="video-thumbnail-container">
            <img src="${thumbnail}" alt="${title}" class="video-thumbnail" loading="lazy">
            <div class="video-play-overlay">
              <div class="video-play-icon"></div>
            </div>
          </div>
          <div class="video-content">
            <h3 class="video-title">${title}</h3>
            <p class="video-description">${description}</p>
            <div class="video-meta">
              <span class="video-date">${publishedAt}</span>
              <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="video-link">Watch on YouTube →</a>
            </div>
          </div>
        </div>
      `;

      $("#videos-container").append(videoCard);
    });

    // Add click handler to open videos
    $(".video-card").click(function () {
      const videoId = $(this).data("video-id");
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    });
  }

  // Fetch videos on page load
  fetchYouTubeVideos();
});
