type Router = {
  push: (href: string) => void;
};

let router: Router | null = null;

export function setRouter(r: Router) {
  router = r;
}

export function navigateTo(path: string) {
  if (router) {
    router.push(path);
  } else if (typeof window !== 'undefined') {
    // router가 아직 초기화되지 않은 경우 fallback
    window.location.href = path;
  }
}
