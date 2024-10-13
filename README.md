# Mini Note Chrome Extension

Mini Note is a simple yet powerful Chrome extension that allows users to take quick notes, organize them with different background and text colors, and manage multiple notes with ease. The extension is equipped with dark mode, search functionality, and more features designed for an intuitive user experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)


## Features

- **Quick Note Creation**: Create and save multiple notes directly from the extension popup.
- **Note Organization**: Assign background colors and text colors to notes for better visual organization.
- **Dark Mode**: Toggle between dark and light modes for comfortable usage in different lighting environments.
- **Search Functionality**: Easily search through saved notes by title or content.
- **Character Count**: Keep track of your note length with a real-time character counter.
- **Export Notes**: Export your notes to a `.txt` file for easy backup or sharing.
- **Clipboard Copy**: Copy note content directly to your clipboard with one click.
- **Delete All Notes**: Bulk delete all saved notes at once for easy management.
- **Persistent Storage**: Notes are saved and synchronized across Chrome sessions using `chrome.storage.sync`.

## Installation

Follow these steps to install the Mini Note Chrome Extension from the source code:

### Prerequisites

- Google Chrome browser installed.
- Basic knowledge of Chrome Extensions.

### Steps

1. **Clone the Repository**
   - First, clone this repository to your local machine:
   ```bash
   git clone https://github.com/NSTechBytes/Mini-Note.git
   ```

2. **Open Chrome Extensions Page**
   - In your Chrome browser, navigate to the extensions page by entering the following URL in the address bar:
   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode**
   - On the Extensions page, enable **Developer Mode** by toggling the switch in the upper-right corner.

4. **Load the Extension**
   - Click on **Load unpacked** and select the folder where you cloned the repository.

5. **Use the Extension**
   - The Mini Note icon will appear next to the Chrome address bar. Click on it to start using the extension.

## Usage

Once the extension is installed and loaded, click the extension icon to bring up the popup interface. Here’s how you can use the features:

### Creating a Note
1. Enter a title and content for your note.
2. Pick a background and text color to customize your note.
3. Click the **Save** button to store the note.

### Managing Notes
- **View Saved Notes**: Your saved notes will appear in the sidebar, where you can click on any note to edit or view it.
- **Search Notes**: Use the search bar at the top of the popup to filter through your notes by title or content.
- **Delete Note**: To delete a note, click on the note in the sidebar and click the **Delete** button.
- **Delete All Notes**: To remove all notes, click the **Delete All** button and confirm your choice.
- **Add New Note**: Click the **Add New Note** button to start a fresh note.

### Export and Copy
- **Export a Note**: You can export the current note by clicking the **Export** button. This will download the note content as a `.txt` file.
- **Copy to Clipboard**: Click the **Copy** button to copy the note's content directly to the clipboard for easy pasting elsewhere.

## Customization

Mini Note offers customization options to enhance user experience:

### Colors
- **Background Color**: Choose a background color for each note to categorize or personalize them.
- **Text Color**: Adjust the text color to improve readability or match the background.

### Dark Mode
Mini Note includes a dark mode toggle. Click the moon/sun icon in the popup to switch between dark and light modes. The choice will be saved and remembered across sessions.

### Character Count
The character count updates as you type in the note field. This feature is helpful if you want to limit note length or keep track of your writing.

## Screenshots

### Light Mode
![Main Interface Screenshot](https://github.com/NSTechBytes/Projects-Templates/blob/main/Extensions/Mini%20Note/Screenshot%20(72).png)

### Dark Mode
![Dark Mode Screenshot](https://github.com/NSTechBytes/Projects-Templates/blob/main/Extensions/Mini%20Note/Screenshot%20(73).png)


## Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository**: Click the "Fork" button at the top right of this page.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/NSTechBytes/Mini-Note.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```
4. **Make your changes**: Add features or fix bugs.
5. **Push your changes**:
   ```bash
   git add .
   git commit -m "Added new feature"
   git push origin feature-name
   ```
6. **Submit a pull request**: Navigate to the original repository and click "New Pull Request."

Please ensure that your code adheres to the existing coding standards and includes appropriate documentation.

### Issues

If you encounter any bugs or have feature requests, please open an issue on GitHub. Provide as much detail as possible so we can address the problem efficiently.

## Future Enhancements

Here are some features that we plan to add in future releases:

- **Sync Across Devices**: Allow users to sync notes across multiple devices.
- **Categories and Tags**: Organize notes into categories and add tags for better note management.
- **Reminders**: Set reminders for important notes that will notify the user at a specific time.
- **Rich Text Editor**: Add a rich text editor to format notes with bold, italics, lists, and more.
- **Offline Access**: Provide offline access so that users can continue creating and editing notes without an internet connection.

Feel free to suggest additional features by opening an issue or submitting a pull request.



---

We hope you find Mini Note useful! If you like this project, consider giving it a star ⭐ on GitHub to show your support.

