import { Link } from "react-router-dom";
export default function Footer() {
    const openInNewTab = (url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
  return (
    <div className='bottom-0'>
      <div className="w-full bg-gray-300 h-24 flex justify-center items-center flex-col">
        <h1>CopyRight &copy; By Omar Salah 2024</h1>
        <div className="py-3">
          <Link
            onClick={(e) => {
              e.preventDefault();  
              openInNewTab("https://www.facebook.com/profile.php?id=100005391368762");
            }}
          >
            <i className="fa-brands fa-facebook mx-2"></i>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();  
              openInNewTab("https://x.com/omarsallah22");
            }}
          >
            <i className="fa-brands fa-twitter mx-2"></i>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();  
              openInNewTab("https://www.instagram.com/_omarsallah_/");
            }}
          >
            <i className="fa-brands fa-instagram mx-2"></i>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();  
              openInNewTab("https://www.linkedin.com/in/omar-salah-901149240/");
            }}
          >
            <i className="fa-brands fa-linkedin mx-2"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
