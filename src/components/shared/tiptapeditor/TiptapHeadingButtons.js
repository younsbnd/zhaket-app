import React from 'react';
import { Button, Tooltip } from '@heroui/react';

const TiptapHeadingButtons = ({ editor }) => {
  if (!editor) return null;

  const headingLevels = [1, 2, 3];

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Paragraph" placement="bottom" closeDelay={0}>
        <Button
          aria-label="Paragraph"
          size="sm"
          radius="sm"
          variant={editor.isActive('paragraph') ? 'solid' : 'flat'}
          color={editor.isActive('paragraph') ? 'primary' : 'default'}
          className="min-w-8"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </Button>
      </Tooltip>
      {headingLevels.map((level) => (
        <Tooltip content={`Heading ${level}`} placement="bottom" closeDelay={0} key={level}>
          <Button
            aria-label={`Heading ${level}`}
            size="sm"
            radius="sm"
            variant={editor.isActive('heading', { level }) ? 'solid' : 'flat'}
            color={editor.isActive('heading', { level }) ? 'primary' : 'default'}
            className="min-w-8"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default TiptapHeadingButtons;
