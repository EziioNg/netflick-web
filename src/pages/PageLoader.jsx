const PageLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-sm opacity-80">Đang tải nội dung...</p>
      </div>
    </div>
  );
};

export default PageLoader;
