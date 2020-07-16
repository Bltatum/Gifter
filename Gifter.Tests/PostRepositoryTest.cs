using Gifter.Models;
using Gifter.Repositories;
using Microsoft.EntityFrameworkCore.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Gifter.Tests
{
    public class PostRepositoryTests : EFTestFixture
    {
        public PostRepositoryTests()
        {
            AddSampleData();
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Title()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("Dude", false);

            Assert.Equal(2, results.Count);
            Assert.Equal("El Duderino", results[0].Title);
            Assert.Equal("The Dude", results[1].Title);
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Caption()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("it is no dream", false);

            Assert.Equal(1, results.Count);
            Assert.Equal("If you will it, Dude, it is no dream", results[0].Caption);
        }

        [Fact]
        public void Search_Should_Return_Empty_List_If_No_Matches()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("foobarbazcatgrill", false);

            Assert.NotNull(results);
            Assert.Empty(results);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_First()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", true);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[0].Title);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_Last()
        {
            var mostRecentTitle = "A Test";
            var repo = new PostRepository(_context);
            var results = repo.Search("", false);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[2].Title);
        }

        [Fact]
        public void User_Can_Delete_Post_With_Comment()
        {
            var postIdWithComment = 2;
            var repo = new PostRepository(_context);

            // Attempt to delete it
            repo.Delete(postIdWithComment);

            // Now attempt to get it
            var result = repo.GetById(postIdWithComment);

            Assert.Null(result);
        }

        //test for getByUserId

        //The Posts in the result set should be ordered alphabetically by title
        [Fact]
        public void Post_Are_Ordered_Alphabetically_By_Title()
        {   
           
            var user = 2;
            var repo = new PostRepository(_context);
            var results = repo.GetByUserProfileId(user);

            Assert.Equal("A Test", results[0].Title);
        }
        //The Posts in the result set should only belong to the user whose ID was passed in
        [Fact]
        public void Post_Are_By_User_Id()
        {

            var user = 2;
            var repo = new PostRepository(_context);
            var results = repo.GetByUserProfileId(user);

            Assert.Equal(user, results[0].UserProfileId);
        }

        // If the ID that gets passed in doesn't belong to a user, 
        //the method should return an empty list
        [Fact]
        public void Post_Belong_To_User()
        { 
         
            var repo = new PostRepository(_context);
            var results = repo.GetByUserProfileId(5);

            Assert.NotNull(results);
            Assert.Empty(results);
        }

        //Get most recent Post
        //If numResults is (?), then the result set should only have (?) Post in it
        [Fact]
        public void Get_Most_Recent_Post_numResults_1()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(3);

            Assert.Equal(3, result.Count);

        }
        [Fact]
        public void If_Num_Results_Is_0()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(0);

            Assert.Equal(0, result.Count);
            Assert.NotNull(result);
            Assert.Empty(result);

        }

        [Fact]
        public void Always_Most_Recent_Post()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(4);
            var expected = "The Dude";

            Assert.Equal(expected, result[0].Title);

        }

        // Add sample data
        private void AddSampleData()
        {
            var user1 = new UserProfile()
            {
                Name = "Walter",
                Email = "walter@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(365),
                FirebaseUserId = "8YnYtVbxbIgq593hWD45CxSPhtq2"
            };

            var user2 = new UserProfile()
            {
                Name = "Donny",
                Email = "donny@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "8YnYtVbxbIgq593hWD45CxSPhtq2"
            };

            var user3 = new UserProfile()
            {
                Name = "The Dude",
                Email = "thedude@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "8YnYtVbxbIgq593hWD45CxSPhtq2"
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);


            var post1 = new Post()
            {
                Caption = "If you will it, Dude, it is no dream",
                Title = "The Dude",
                ImageUrl = "http://foo.gif",
                UserProfile = user1,
                DateCreated = DateTime.Now - TimeSpan.FromDays(10),
                UserProfileId = 1
            };

            var post2 = new Post()
            {
                Caption = "If you're not into the whole brevity thing",
                Title = "El Duderino",
                ImageUrl = "http://foo.gif",
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(11),
                UserProfileId = 2
            };

            var post3 = new Post()
            {
                Caption = "It really ties the room together",
                Title = "My Rug",
                ImageUrl = "http://foo.gif",
                UserProfile = user3,
                DateCreated = DateTime.Now - TimeSpan.FromDays(12),
                UserProfileId = 3
            };
            var post4 = new Post()
            {
                Caption = "Test test test",
                Title = "A Test",
                ImageUrl = "http://foo.gif",
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(11),
                UserProfileId = 2
            };

            var comment1 = new Comment()
            {
                Post = post2,
                Message = "This is great",
                UserProfile = user3
            };

            var comment2 = new Comment()
            {
                Post = post2,
                Message = "The post really tied the room together",
                UserProfile = user2
            };

            _context.Add(post1);
            _context.Add(post2);
            _context.Add(post3);
            _context.Add(post4);
            _context.Add(comment1);
            _context.Add(comment2);
            _context.SaveChanges();
        }
    }
}