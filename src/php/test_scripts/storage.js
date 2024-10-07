class StorageModule {
    constructor() {
      this.geojson = {};
      this.tiles = new Map();
      this.files = new Map(); // Mocking file storage for now
    }
  
    // GEOJSON CRUD Methods
    createGeoJSON() {
      this.geojson = { type: "FeatureCollection", features: [] };
      console.log("GeoJSON Created", this.geojson);
    }
  
    readGeoJSON() {
      console.log("GeoJSON Read", this.geojson);
      return this.geojson;
    }
  
    updateGeoJSON(newData) {
      this.geojson.features.push(newData);
      console.log("GeoJSON Updated", this.geojson);
    }
  
    deleteGeoJSON() {
      this.geojson = {};
      console.log("GeoJSON Deleted");
    }
  
    // Basemap Tile Methods
    fetchTile(url) {
      console.log("Fetching Tile:", url);
      // Simulate tile fetch
      return "Tile Data from " + url;
    }
  
    cacheTile(url, tileData) {
      this.tiles.set(url, tileData);
      console.log("Tile Cached:", tileData);
    }
  
    // File Methods
    uploadFile(file) {
      this.files.set(file.name, file);
      console.log("File Uploaded:", file);
    }
  
    fetchFile(fileName) {
      const file = this.files.get(fileName);
      console.log("File Fetched:", file);
      return file;
    }
  
    deleteFile(fileName) {
      this.files.delete(fileName);
      console.log("File Deleted:", fileName);
    }
  }
  
  // Initialize the storage module
  const storage = new StorageModule();
  
  // Hooking up the buttons
  function createGeoJSON() {
    storage.createGeoJSON();
    document.getElementById('geojson-output').innerText = JSON.stringify(storage.readGeoJSON());
  }
  
  function readGeoJSON() {
    document.getElementById('geojson-output').innerText = JSON.stringify(storage.readGeoJSON());
  }
  
  function updateGeoJSON() {
    const newFeature = { type: "Feature", geometry: { type: "Point", coordinates: [0, 0] }, properties: {} };
    storage.updateGeoJSON(newFeature);
    document.getElementById('geojson-output').innerText = JSON.stringify(storage.readGeoJSON());
  }
  
  function deleteGeoJSON() {
    storage.deleteGeoJSON();
    document.getElementById('geojson-output').innerText = "GeoJSON Deleted";
  }
  
  function fetchTile() {
    const tileData = storage.fetchTile("https://tileserver.com/tile");
    document.getElementById('tile-output').innerText = tileData;
  }
  
  function cacheTile() {
    storage.cacheTile("https://tileserver.com/tile", "Sample Tile Data");
    document.getElementById('tile-output').innerText = "Tile Cached";
  }
  
  function uploadFile() {
    const mockFile = { name: "example.pdf", data: "PDF content" };
    storage.uploadFile(mockFile);
    document.getElementById('file-output').innerText = "File Uploaded: " + mockFile.name;
  }
  
  function fetchFile() {
    const fileData = storage.fetchFile("example.pdf");
    document.getElementById('file-output').innerText = fileData ? `File: ${fileData.name}` : "File Not Found";
  }
  
  function deleteFile() {
    storage.deleteFile("example.pdf");
    document.getElementById('file-output').innerText = "File Deleted";
  }
  