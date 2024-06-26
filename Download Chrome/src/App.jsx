import React, { useState } from "react";
import "./Styles/App.css";

export default function FloatingButton() {
  const [isPopUp, setisPopUp] = useState(false);
  const [filename, setFilename] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const [creator, setCreator] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("filename");

  const handleClick = () => {
    setisPopUp(true);
    setSelectedFileIndex(null);
    setFilename("");
    setFileImage(null);
    setCreator("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");
    if (selectedFileIndex !== null) {
      // Update existing file
      const updatedFileList = [...fileList];
      updatedFileList[selectedFileIndex] = { filename, fileImage, creator };
      setFileList(updatedFileList);
    } else {
      // Add submitted data to fileList
      setFileList([...fileList, { filename, fileImage, creator }]);
    }
    // Reset form values
    setFilename("");
    setFileImage(null);
    setCreator("");
    // Close the popup
    setisPopUp(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if file is not null and less than 2MB
    if (file && file.size <= 2 * 1024 * 1024) {
      setFileImage(file);
    } else {
      // Clear file input if invalid file
      event.target.value = null;
      setFileImage(null);
      alert("Please select a file less than 2MB.");
    }
  };

  const handleRemove = (index) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(index, +1);
    setFileList(updatedFileList);
  };

  const handleEdit = (index) => {
    setisPopUp(true);
    setSelectedFileIndex(index);
    const { filename, fileImage, creator } = fileList[index];
    setFilename(filename);
    setFileImage(fileImage);
    setCreator(creator);
  };
  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // Function to handle selecting search by option
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };
  // Filter file list based on search term and search by option
  const filteredFiles = fileList.filter((file) => {
    if (searchBy === "filename") {
      return file.filename.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "creator") {
      return file.creator.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="container-row">
            <div className="card">
              <img
                className="ImageChrome"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/640px-Google_Chrome_icon_%28February_2022%29.svg.png"
                alt="chromPicture"
              />
              <h3 className="ChromeDownload">ChromeDownload</h3>
              <input
                className="container-search"
                placeholder="Search your files"
              />
            </div>
          </div>
          <h4 className="manageFile">
            Your <a href="#">_profile is manage_</a>by sabaicode.com
          </h4>
        </div>
      </div>
      <div className="floating-button" onClick={handleClick}>
        ADD
      </div>

      {isPopUp && (
        <div className="popup">
          <form className="formPopUp" onSubmit={handleSubmit}>
            <h3 className="titleFile">Create Files</h3>
            <br />
            <label className="filename">Filename:</label>
            <input
              className="box"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              required
            />
            <br /> <br />
            <label className="filename">File Image (max 2MB)</label>
            <input
              className="box"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <br /> <br />
            <label className="filename">Creator (3 letters up):</label>
            <input
              className="box"
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              minLength={3}
              required
            />
            <br />
            <button className="create" type="submit">
              {selectedFileIndex !== null ? "Update" : "Create"}
            </button>
            <button className="create" type="button" onClick={handleClick}>
              Close
            </button>
          </form>
        </div>
      )}
      <div className="container-box">
        <div className="file-list">
          <br />
          {/* <h3 className="classfile-list">File List</h3> */}
          {fileList.map((file, index) => (
            <ul className="Update-list" key={index}>
              <img
                className="Image-box"
                src={URL.createObjectURL(file.fileImage)}
                alt={file.filename}
              />
              <strong>{file.filename}</strong> - {file.creator}
              <button className="edit" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button className="remove" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
