import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function Index() {
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1 className="text-violet-700 text-lg">
              <span> Hello there, </span>
              Welcome Employee 👋
            </h1>
          </div>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
