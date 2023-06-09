import React from 'react';

import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

export default function FilePonding({ file, setFile }) {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  return (
    <FilePond
      files={file}
      allowReorder={true}
      allowMultiple={false}
      onupdatefiles={setFile}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
}
