MAISIE BEEDLES – ART & DESIGN PORTFOLIO
=======================================

OPEN IT
  Double-click index.html. It works offline and uses no outside websites, fonts or trackers.

PUBLISH IT (optional)
  Upload everything in this folder to a GitHub Pages repository (keep the folder structure).
  Note: a published site can be opened by anyone who has the link.

ADD A NEW PIECE OF WORK
  1. Save the picture (a .jpg, around 2000 pixels on the long side, is plenty) into  images/full/
     Optional: a smaller copy (around 800 pixels wide) with the SAME name in  images/thumb/
     for faster loading. If there is no thumb the full picture is used.
  2. Open js/data.js in Notepad / TextEdit and find the project it belongs to.
  3. Add a line inside that project's "items" list, copying an existing one:

        { "img": "my-new-piece", "title": "My new piece", "caption": "One sentence about it.", "w": 800, "h": 600 },

     "img" is the file name without .jpg.  Add  "featured": true  to show it large at the top.
     "w" and "h" are the picture's width and height in pixels (they stop the page jumping while it loads;
     approximate numbers with the right shape are fine).

ADD A WHOLE NEW PROJECT
  Copy one project block in js/data.js (from { "id": ... down to its closing }), paste it after a comma,
  and change the id, title, subtitle, tags, text and items.
  Use  "accent": "pink"  or  "blue"  for the colour of the section.

CHANGE THE ABOUT ME TEXT, SKILLS OR "HOW I WORK"
  They are at the top of js/data.js ("about", "skills", "steps"). Please make "about" sound like Maisie!

IN THE INTERVIEW
  - "Start slideshow" (top of the page) steps through every piece full-screen.
  - Each project has its own "Slideshow" button.
  - Arrow keys or swipe to move, N shows her notes for that project, F = full screen, Esc closes.
