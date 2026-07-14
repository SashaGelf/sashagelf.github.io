# GENERAL
- [x] Add current files to repo
- [x] Launch Github Page once code is functional
- [ ] Double check my old "to do still.txt" file



# ASSETS
## Images
- [ ] Create a custom image for the button to pull up the task list, then implement in CSS
- [ ] Create a custom image for the button to open the "about" section, then implement in CSS
- [ ] Adjust sizes of custom button images so they're all the same height
- [ ] Make image files smaller so the browser doesn't have to download unnecessarily big files
- [ ] Consider reformatting images as svg
- [ ] Create icon, then add link to icon in head of HTML pages

## Fonts
- [ ] Add fonts

# HTML
- [ ] Fix up elements and attributes (e.g. alt text on images) to improve accessability (and SEO)
- [ ] Add label elements for accessability
- [ ] Once I've created an icon, add link to icon to head of all pages



# CSS
## General Layout
- [ ] Fix up styling, specifically for mobile
- [ ] Specifically, fix mobile styling for "first tasks" section
- [ ] Improve the layout for a browser window under 768px wide but wider than the average mobile screen (think tablet size, or a window taking up only half a computer screen, for example)

## Color and Font
- [ ] Finish styling text and input on "first tasks" section
- [ ] Consider changing the fonts for the "first tasks" menu and the full task list (maybe some other places too). Perhaps something calibri-ish, so longer sections of text are streamlined with less non-standard "character".
- [x] Utilise :root for quick access to the color palette and standardized sizing

## Spacing
- [ ] Make spacing and sizing more cohesive
    - [ ] Margins and padding
    - [ ] Gaps and spacing
    - [ ] Widths and heights
    - [ ] Border radii

## Effects
- [ ] Once I've made custom "list" and "about" buttons, implement in CSS
- [ ] Add a little bit of shadow to bingo squares on hover (desktop.css)
- [ ] Animate button clicks
- [ ] Animate bingo square transitions (horizontal "flip"?)
- [ ] Would it be fun to try making a custom cursor???



# JS
## "First Tasks" Section
- [x] Make sure importing task list option works
- [ ] Create option to choose 24 tasks from a list of pre-made options (so you don't need to come up with 24 recurring tasks on the spot the first time you open the website)
- [ ] Implement ability to create initial task list from a combination of both written tasks and selected pre-made tasks (just multiple sources in general)

## Score History Menu
- [ ] Make sure this whole section is working now!
- [ ] Make sure the issue on scoreLogic.js line 43 (is that still the correct line?) is fixed. The code should be able to reduce now
- [ ] Consider changing the table so the date displays are rows on the table (spanning multiple columns), instead of separate text between separate tables

## Task Logic
- [ ] Fix taskLogic.js line 49 (?)

## Saving and Loading
- [ ] Check if manual save button is working

## Future Features
- [ ] Create "settings" menu
- [ ] Create "about" menu
- [ ] Make "settings" and "about" buttons actually do something

- [ ] Ability to delete saved data
- [ ] Ability to download saved data, maybe as a json (inspired by Cookie Clicker's save backup ability, credit where credit is due)
- [ ] Ability to upload that downloaded saved data
- [ ] Perhaps saved SCORE data and saved TASK LIST data would be separate for those functionalities? So you could import a list of tasks without overwriting your locally saved score.

- [ ] Ability to remove tasks from the list alltogether
- [ ] Ability to add tasks that DON'T recurr???

- [ ] I'd love to add some type of visual effect when you score points (any kind of point). Maybe with a fun little motivational message, some confetti, and a sound effect?
- [ ] Sound in general would be a nice thing to add eventually, little clicks for clicking on things and a celebratory sound for scoring a point.
- [ ] If implementing sound effects, add mute button