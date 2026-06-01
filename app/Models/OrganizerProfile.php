<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganizerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'org_name',
        'id_proof_path',
        'org_description',
        'org_phone',
        'org_website',
        'approval_status',
        'admin_note',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isApproved(): bool
    {
        return $this->approval_status === 'approved';
    }
    public function isPending(): bool
    {
        return $this->approval_status === 'pending';
    }
    public function isRejected(): bool
    {
        return $this->approval_status === 'rejected';
    }
}
