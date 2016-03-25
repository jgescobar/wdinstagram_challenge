console.log("templates loaded…");

var showEntryTemplate = `
<div class="entry" id="<%= entry.id %>">
  <span class="author-text"><%= entry.author %></span>
  <span class="date-text"><%= entry.dateTaken %></span>
  <hr class="before"/>
  <img alt="Entry Image" src="<%= entry.photoUrl %>" />
  <hr class="after"/>
  <span class="likes-text">
    <a class="like-link">
      <%= entry.formattedLikes %>
    </a>
  </span>
</div>
`;
var renderShowEntry = _.template(showEntryTemplate);

var indexEntriesTemplate = `
<% entries.forEach(function(entry){ %>
  <div class="entry" id="<%= entry.id %>">
    <a class="show-link">
      <span class="author-text"><%= entry.author %></span>
    </a>
    <span class="date-text"><%= entry.dateTaken %></span>
    <hr class="before"/>
    <a class="show-link">
      <img alt="Entry Image" src="<%= entry.photoUrl %>"/>
    </a>
    <hr class="after"/>
    <span class="likes-text">
      <a class="like-link">
        <%= entry.formattedLikes %>
      </a>
    </span>
  </div>
<% }) %>
`;
var renderIndexEntries = _.template(indexEntriesTemplate);

var entryFormTemplate = `
<form action="/entries" method="POST">
  <label>
    Author
    <input id="author" type="text" name="entry[author]" />
  </label>

  <label>
    Photo Url
    <input id="photo-url" type="url" name="entry[photoUrl]" />
  </label>

  <label>
    Date Taken
    <input id="date-taken" type="date" name="entry[dateTaken]" value="<%= Date.today %>"/>
  </label>

  <button>Save!</button>
</form>
`;
var renderEntryForm = _.template(entryFormTemplate);
