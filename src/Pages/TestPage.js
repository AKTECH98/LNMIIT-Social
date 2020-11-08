import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function TestPage() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        size = "medium"
        color = "primary"
        label = "Hello"
      />
    </div>
  );
}
