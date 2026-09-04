const AuthFooter = () => {
  return (
    <div className="dev-mode-stripes border-t border-gray-200 px-4 py-2 text-center">
      <p className="text-[11px]" style={{ color: "#6B7280" }}>
        Secured by <span className="font-semibold" style={{ color: "#374151" }}>InsiderJobs</span>
      </p>
      <p className="mt-0.5 text-[12px] font-semibold" style={{ color: "#F97316" }}>
        Development mode
      </p>
    </div>
  );
};

export default AuthFooter;
