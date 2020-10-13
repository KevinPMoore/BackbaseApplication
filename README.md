# Backbase Front End - Kevin Moore

## Foreward
I wanted to take a moment to thank the Backbase team for their consideration and review.  This has been the most challenging pure front-end project that I have ever worked on and I have learned a lot through doing it.  I have made every effort to work in a way that is as 'vanilla' as possible and avoided Bootstrap and other libraries whenever I could.  While I am very happy with the progress I have made, this project is far from complete.  This is not for a lack of effort as the commit history will indicate, rather it is because I wanted to respect the timetable set forward to complete this task.  I fully intend to continue working on this assignment for my own benefit over the next few days.  I've done my best to explain the decisions I made throughout the application below, but am more than happy to field any questions or provide clarification via email (moore.kevin.p@gmail.com).  

Project repository: https://github.com/KevinPMoore/BackbaseApplication
Live client: https://backbase-application-git-master.kpmoore.vercel.app/

Thank you for your time,
Kevin Moore

## Setup
Setup for this application is very straightforward.  After downloading the application from the project repository (linked above) simply navigate to the destination directory in your termina and install the node packages (npm i).

## Frameworks
React was chosen as the framework for this assignment for a few reasons.  First, based on the design image it is easy to identify separate components that will require unique logic and React is a useful framework for compartmentalizing code.  Second, React scales well.  While not required for this specific assignment, React is well suited for integrating new components or adding features to existing components.  For example with a longer transaction history the Transactions component could easily be refactored such that the list element was a separate component designed to scroll within the Transactions component.  Finally, React is the framework I am most comfortable working with.  This is the least important reason for choosing it, but when trying to demonstrate my abilities it helps to be able to focus more on the work itself than the method of achieving it.

## Application Structure
The structure of the application flows neatly from the choice of Framework.  The App.js file would hold any application-wide logic or variables.  This would be useful if we were to add a feature like a login system that has implications on many components.  The Header component, as the application stands, could have been rolled into the App.js file.  I elected not to do this, however, because keeping it separate would make adding features like navigation elements much easier.  The Transfer component consists primarily of a controlled form that holds input values in state.  The state of the Transfer component also holds an error message that provides information to users when the form fails validation.  A modal is used to handle the confirmation of transfers and execute the business logic.  The Transactions component is the most incomplete.  It consists of a form used to filter through a list of transactions provided in the mocktransactions.json file.  The transactions are rendered in an ordered list below the form.  

## Additional Work
Below is a list of issues I intend to address with this application ranked in order of how urget I believe them to be.
1. Filtering transactions by search term does not work and causes the application to crash with errors relating to undefined values.  I am unsure why this occurs currently as I have confirmed the function that renders the transaction list can handle rendering an empty transaction.
2. The logic for sorting transactions has not been implemented.  A function has been written that is attempting to combine a merge sort with a switch, however I feel that this approach in its current form utterly fails at being DRY.  I am confident there is a cleaner implementation and I am still searching for it.
3. Colors for the vertical bars as well as the company logos in the Transaction component are not loading dynamically.  Frankly I haven't encountered dynamic file importing before and was stumped as to how to approach this.  My research indicated that webpack offered some solutions so that is the route I would have gone had the above two issues not been more pressing.
4. While researching the tasks required to complete this project I encountered a school of thought that when handling currency, numbers are not an ideal data type due to floating point issues.  Some engineers recommend a currency object, or the currency.js library.  I believe there is a case to be made for its use with any banking application.
5. Refactor the Transactions component such that the ordered list is a sub-component.  This is not technically necessary but could potentially help with issue 3 and offers the option to scale with things like the addition of a scroll bar.
6. Additional styling for all screen sizes.  I believe the styling for mobile, tablet and full-sized screens is serviceable but could always be improved.  This is an interesting issue because, coming with a technical mindset, the ratio of time to payoff for this is poor.  However I could easily see someone with a different point of view reaching the opposite conclusion.