console.log("My father used to have a saying…");

var $content,
    $allEntriesButton,
    $newEntryButton,
    $showEntryButtons,
    $likeButtons;

$(document).ready(function() {
  $content          = $("#content");
  $allEntriesButton = $("#all-entries");
  $newEntryButton   = $("#new-entry");
  $showEntryButtons = $(".show-link");
  $likeButtons      = $(".like-link");

  $allEntriesButton.on("click", function(evt) {
    console.log("all triggered!");

    loadEntries();
  });

  $newEntryButton.on("click", function(evt) {
    console.log("new triggered!");
    renderAndAppendForm();
  });

  $showEntryButtons.on("click", function(evt) {
    var entryId = $(evt.currentTarget).closest(".entry").attr("id");

    console.log("show triggered!", entryId);
    fetchEntry(entryId);
  });

  $likeButtons.on("click", function(evt) {
    var entryId = $(evt.currentTarget).closest(".entry").attr("id");

    console.log("like triggered!", entryId);
    likeEntry(entryId);
  });
});

// HELPER FUNCTIONS

function setCurrentTab(tabName) {
  $newEntryButton.removeClass("current");
  $allEntriesButton.removeClass("current");

  if (tabName === "new") {
    $newEntryButton.addClass("current");
  } else if (tabName === "all") {
    $allEntriesButton.addClass("current");
  }
}

// AJAX FUNCTIONS

function loadEntries() {
  $.ajax({
    method: "GET",
    url:    "/api/entries"
  })
  .then(
    function(res) {
      console.log("Success:", res);
      renderAndAppendAllEntries(res.data);
    },
    function(err) {
      console.log("Failed:", err);
    }
  );
}

function fetchEntry(entryId) {
  $.ajax({
    method: "GET",
    url:    "/api/entries/" + entryId
  })
  .then(
    function(res) {
      console.log("Success:", res);
      renderAndAppendEntry(res);
    },
    function(err) {
      console.log("Failed:", err);
      alert(err.message);
    }
  );
}

function createEntry(entry) {
  // TODO: implement create!
}

function likeEntry(entryId) {
  // TODO: implement liking an entry!
}

// RENDER FUNCTIONS

function renderAndAppendAllEntries(entries) {
  setCurrentTab("all");

  $entries = $(renderIndexEntries({entries: entries}));
  $entries.find(".show-link").on("click", function(evt) {
    var entryId = $(evt.currentTarget).closest(".entry").attr("id");

    console.log("show triggered!", entryId);
    fetchEntry(entryId);
  });
  $entries.find(".like-link").on("click", function(evt) {
    var entryId = $(evt.currentTarget).closest(".entry").attr("id");

    console.log("like triggered!", entryId);
    likeEntry(entryId);
  });

  $content.empty();
  $content.append($entries);
}

function renderAndAppendEntry(entry) {
  setCurrentTab();

  $entry = $(renderShowEntry({entry: entry}));
  $entry.find(".like-link").on("click", function(evt) {
    var entryId = $(evt.currentTarget).closest(".entry").attr("id");

    console.log("like triggered!", entryId);
    likeEntry(entryId);
  });

  $content.empty();
  $content.append($entry);
}

function renderAndAppendForm() {
  setCurrentTab("new");

  $entryForm = $(renderEntryForm());
  $entryForm.on("submit", function(evt) {
    evt.preventDefault();

    var author    = $("#author").val(),
        photoUrl  = $("#photo-url").val(),
        dateTaken = $("#date-taken").val();

    console.log("submit triggered!", author, photoUrl, dateTaken);
    createEntry({author: author, photoUrl: photoUrl, dateTaken: dateTaken});
  });

  $content.empty();
  $content.append($entryForm);
}
