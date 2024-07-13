import { HomeIcon, SearchIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

const navigation = [
  {
    name: 'Home',
    href: '/',
    icon: (props: Props) => <HomeIcon {...props} />,
  },
  {
    name: 'Search',
    href: '/search',
    icon: (props: Props) => <SearchIcon {...props} />,
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: (props: Props) => <ShoppingCartIcon {...props} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: (props: Props) => <UserIcon {...props} />,
  },
];

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <footer className="bg-gypsum flex mt-auto mb-12 border-black border-t rounded-lg shadow-lg fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-16 items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-center space-x-4 md:space-x-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className="text-black hover:text-forest flex flex-col items-center"
            >
              <item.icon className="h-8 w-6" aria-hidden="true" />
              <span className="sr-only">{item.name}</span>
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}


