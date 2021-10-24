import './SearchBadge.scss';
import { useState } from "react";

export default function SearchBadge({ text }) {
  return (
    <div className='search-info'>
      {text}
    </div>
  )
}