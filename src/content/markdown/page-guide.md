---
title: Case Study Guidelines
section: guide
ref: page-guide
---

When creating a case study, first creatate a folder with the name of the case-study city and iso2 country code in all lower case with spaces represented by dashes (e.g. new-york-us). This should be unique for each case study and will serve as the url and id for each case study.

inside the folder you will create a markdown (plain text) file called "index.md". The folder will also contain a featured image for the page heading along with any other images referenced in the case study post.

## Formatting the Markdown File

Each case study markdown files will required a sets of metadata (or frontmatter) and body conent.

### Metadata / Frontmatter

The metadata is placed at the beginning of the file inside and opening and closing set of three dashes "–––". Each items starts with the identifier followed by a colon and then your case study content and are separated by a line break.

```
---
title: Case Study Template
status: Draft
description: Lorem ipsum dolor sit amet.
city: New York
country_code: US
centroid: [40.712778, -74.006111]
year_start: 2012
year_completed: 2018
featured_image: ./hannah-busing-0V6DmTuJaIk-unsplash.jpeg
featured_desc: New York City Skyline
featured_credit: Hannah Busing (Unsplash)
author: Urban Tech Hub
tags:
  - Code
  - Markdown
---
```

**title**: should be the main title of the case study. Usually the city name

**status**: reflectes the state of the current posts and can reflect three states.

- Draft: Draft post in process
- Review: Ready for review
- Complete: Post ready for publication

**description**: should be a one sentence summary of the case study

**city**: Should be the city name

**county_code**: Should be the [ISO 3 Letter Country Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) of the city capitalized

**centroid**: should be the geographic centroid of the case study city/location. For cities the easiest method is to lookup the cities' [wikipedia article](https://en.wikipedia.org/wiki/New_York_City), and click on the coordinates number at the top of the page which will take you to a page with [multiple coordinate formats](<https://geohack.toolforge.org/geohack.php?pagename=New_York_City&params=40_42_46_N_74_00_22_W_region:US-NY_type:city(8804190)>). Copy the "decimal" value which is are two value separated by a comma and place the values inside brackets [40.712778, -74.006111] keeping all six decimal places.

**year_start**: Year the project started

**year_completed**: Year the project was completed. If project is ongoing, leave blank

**featured_image**: should be the filename of the of the feature image for the case study preceeded by a period and forward slash **_./filename.jpeg_** The image should be placed withing the same folder as the markdown file and ideally be a 1920px wide by 1280px tall (landscape) jpeg image. Permission must be recieved for any images used or they must be creative commons or otherwise rigths cleared. Services like [unsplash] can be a useful way to find [good images](https://unsplash.com/photos/0V6DmTuJaIk) that are free to use

**featured_desc**: should be short description of what the featured image is showing for alt text and accessibilty

**featured_credit**: should be the credit for the featured image as either the name of the photographer or organization that provided the image. If the image is taken from a site like unsplash or flickr it should be noted in parentheses _Hannah Busing (Unsplash)_
author: Urban Tech Hub

**author**: should be the author of the case study

**tags** should contain any key topic tags listed in markdown list format on the line below.

## Case Study Text

The body of the case study should follow [this example](/example/)
