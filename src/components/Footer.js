import React from 'react'

export default function Footer() {
  return (
    <footer className="text-center text-white bg-dark p-4">
          <strong>&copy; {new Date().getFullYear()} <a href='http://codyslivinski.com'>Cody Slivinski</a>, All Rights Reserved.</strong>
      </footer>
  )
}
