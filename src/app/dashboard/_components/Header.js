import Avatar from "./common/Avatar";

function Header() {
  return (
    <div className="flex border p-4 shadow-sm justify-between">
      <div></div>
      <div>
        <Avatar bool={false} avClass="" />
      </div>
    </div>
  );
}

export default Header;
