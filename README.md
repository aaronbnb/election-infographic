# Election Infographic
An accessible, interactive infographic where users select the winner for close U.S. Senate race and predict which party controls the U.S. Senate. This infographic was used to provides an accessible example for a major media organization.
**Accessibility Features**

- Implemented a roving tabindex. Composite widgets such as tab panels, radio groups typically represent a single tab stop. Keyboard and assistive technology users can more efficiently navigate the page. Using the Tab key to move from element to the next is an acceptable approach.
- The Application role is set on the SVG. This role  instructs screen readers to treat the element as a desktop application and not use their traditional techniques for interpreting HTML. This ensures that the screen reader does not intercept the keystrokes intended to reach the SVG.
- The SVG elements are in a logical reading/focus order. The reading order/focus order is set by the sequence of elements in the HTML source code. If the user selects a different forecaster and the states are dynamically rearranged, ensure the individual states have a logical order in the HTML source code.
- When a user leaves the widget, we clear the live region to ensure that the screen reader user does not encounter the live region text.
- The page's content is summarized in the live announcement region. The announcements are fairly long. To gauge the user experience for screen reader users, user testing is recommended.
- To help screen reader users shortcut the long live announcement, the live region is set to aria-live="assertive". Assertive announcmeents interrupt what is currently being announced to be announced first. Polite live announcements wait until the end of the current announcement before being announced
- It's recommended to provide a visual label with the state's name for each state. People may not recognize the states by shape.
- The overarching instruction for the bee-swarm "Click or tap the state circles to assign a winner." is inappropriate. It relies on the user perceiving the shape of the controls. It does not provide enough information for people, not only disabled people. It also makes assumptions about how the user is accessing the web in "click or tap". If the visual label is made more descriptive, the aria-label attribute applied to the SVG could be shortened
