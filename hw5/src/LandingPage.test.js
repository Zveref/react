import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'; 
import LandingPage from "./LandingPage";
import preview from 'jest-preview';
import { JournalAlbum } from "react-bootstrap-icons";
import mockFetch from "./mockFetch";

const fakeLocalStorage = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      console.log(key)
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
    getAll: function(){
      return store;
    }
  };
})();






// afterEach(() => {
//   jest.restoreAllMocks()
//   localStorage.clear();
// });

describe("test login page", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
    window.localStorage.clear();
  })

  // afterEach(() => {
  //   jest.restoreAllMocks()
  // });

  

  it("initial fetch persists",  () => {
    render(<Router><LandingPage /></Router>);
    // const testU = "Antonette";
    // const testP = "Victor Plains";

    // expect(screen.getByRole("heading")).toHaveTextContent(/Log In/);
    // const logInButton = screen.getByRole("button", { name: "Log in" });
    // const username = screen.getByPlaceholderText("User Name")
    // const password = screen.getByPlaceholderText("password")

    // //can't login with wrong username
    // expect(logInButton).not.toBeDisabled();
    // fireEvent.change(username, { target: { value: '123' } })
    // fireEvent.change(password, { target: { value: '123' } })
    // userEvent.click(logInButton);
    // expect(screen.getByText(/This userName is not registered/)).toBeInTheDocument();
    
    // localStorage.setItem("A", "1");
    expect(localStorage.setItem).toHaveBeenCalledOnce;
    console.log("here", window.localStorage.getAll())

    // //can't login with wrong username
    // expect(logInButton).not.toBeDisabled();
    // fireEvent.change(username, { target: { value: "Antonette" } })
    // fireEvent.change(password, { target: { value: '123' } })
    // userEvent.click(logInButton);
  });

  
    


})






  
  
 


// test("data is added into local storage", () => {
//   const mockId = "1";
//   const mockVal = JSON.stringify(mockId)
//   localStorage.setItem(mockId, mockVal)
//   expect(localStorage.getItem(mockId)).toEqual(mockVal);
// });