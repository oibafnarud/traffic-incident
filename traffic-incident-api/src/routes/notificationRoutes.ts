router.get('/requests',
    auth,
    checkRole([UserRole.INSURANCE_AGENT]),
    async (req: Request, res: Response) => {
      const requests = await InsuranceLetter.find({
        insuranceCompanyId: req.user.insuranceCompanyId
      });
      res.json(requests);
    }
   );