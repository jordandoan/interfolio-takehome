## What libraries did you use? Why did you use them?

I used Material UI because of it had many useful components. It had a paginator, which I was able to use to fulfill the user story. 
I also used a snackbar to display any errors when calling the API. I was able to focus more on completing the task then worrying about accessibility and 
creating a good looking application.

## If you had more time, what further improvements or new features would you add?

One change I would make is to either make the paginator show on the bottom of the page as well as on top of the page, or to make the toolbar 
stick to the window as you scroll down. This would make it easier for users to navigate pages since they wouldn't have to scroll back to the top.  

Outside of the features described in the preferred user stories, I would also add the option to change how many articles you can view at once, and a way
to save articles you like and being able to view them all in a separate page. 

Another feature that would be useful is to be able to search articles based on the type of article you want, such as journal article, reference entry, or component.
This would help users find what they are looking for.

## Which parts are you most proud of? And why?

I am most proud of the algorithm I designed to cache previous API calls. It was my first time wokring with an API that had pagination, 
and the CrossRef etiquette article mentioned caching results to prevent multiple API calls. Outside of practicing algorithm problems, I never used a cache to solve problems. I used local storage to store the API calls for each page, and decided to delete the cache when reloading the page
because the default API call ( to /works ) would give you different results if you waited long enough to make a new call. It was exciting when I got it work!

## Which parts did you spend the most time with? What did you find most difficult?

I spent a lot of time setting up the project and learning about the features Angular provided. I spent a lot of time looking up things such as:
- fetching API calls
- reading documentation for the API
- two way databinding, event emitters
- importing modules
- writing unit tests

Two way databinding was one of the hardest things about this assignment. There was a lot of steps I had to follow: creating both an input and output and also an event function.
This felt like a lot of work when I only wanted to send one small piece of information. I had to bind the toolbar component with the home component because I was sending information about the page index from
the paginator to the home component, which would make an API call with an offset parameter based off the page the user was on. However, after implementing it once, 
I understood how two-way data binding works and that it was actually really easy to do. 

Writing unit tests was always hard for me: I would spend so much time trying to make mock API calls but they would never work out. Although I was unable to write tests for the
home component, which makes the API calls, I wrote tests for the work component which displays the data received from the API. I sent mock data to the component and tested
that it correctly populated. For example, if the data from the API had a blank title, the title would render as "Untitled", and the test worked for that.
